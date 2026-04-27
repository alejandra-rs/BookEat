import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {RestaurantsService} from '../../services/firebase/restaurants.service';
import {BookingsService} from '../../services/firebase/bookings.service';
import {AuthService} from '../../services/firebase/auth.service';
import {SessionService} from '../../services/session.service';
import {TableMapComponent} from '../../components/table-map/table-map';
import {LoginPopup} from '../../components/login-popup/login-popup';
import {BookingConfirmation} from '../../components/booking-confirmation/booking-confirmation';
import {Restaurant} from '../../models/restaurant.model';
import {firstValueFrom} from 'rxjs';
import {Booking} from '../../models/booking.model';
import proj4 from 'proj4';

const UTM30N = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';
const WGS84  = '+proj=longlat +datum=WGS84 +no_defs';

@Component({
  selector: 'app-book-table-page',
  imports: [RouterLink, TableMapComponent, LoginPopup, BookingConfirmation],
  templateUrl: './book-table-page.html',
  styleUrl: './book-table-page.css',
})
export class BookTablePage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private restaurantsService = inject(RestaurantsService);
  private bookingsService = inject(BookingsService);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);

  readonly id = String(this.route.snapshot.paramMap.get('id'));
  restaurant = signal<Restaurant | null>(null);
  occupiedIds = signal<number[]>([]);
  selectedTables = signal<Set<number>>(new Set());
  loginOpen = signal(false);

  confirmationOpen = signal(false);
  confirmationName = signal('');
  confirmationAddress = signal('');
  confirmationDatetime = signal('');
  confirmationMapUrl = signal<SafeResourceUrl | null>(null);

  constructor() {
    this.restaurantsService.getById(this.id).subscribe(r => {
      this.restaurant.set(r);
      const booking = this.sessionService.booking();
      const datetime = `${booking.date} ${booking.time}`;
      this.bookingsService.getByRestaurantAndDatetime(this.id, datetime).subscribe(bookings => {
        this.occupiedIds.set(bookings.flatMap(b => b.tables));
      });
    });
  }

  onSelectionChanged(ids: Set<number>) {
    this.selectedTables.set(new Set(ids));
  }

  private osmUrl(coordinates: [number, number]): SafeResourceUrl {
    const [lon, lat] = proj4(UTM30N, WGS84, coordinates);
    const offset = 0.005;
    const bbox = `${lon - offset},${lat - offset},${lon + offset},${lat + offset}`;
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lon}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async bookSelected() {
    const user = this.authService.currentUser();
    const restaurant = this.restaurant();
    if (!user || !restaurant || this.selectedTables().size === 0) return;

    const booking = this.sessionService.booking();
    const payload: Omit<Booking, 'id'> = {
      date: this.bookingsService.toDate(booking.date),
      restaurantId: this.id,
      userId: user.id,
      datetime: `${booking.date} ${booking.time}`,
      guests: Number(booking.diners),
      tables: Array.from(this.selectedTables()),
      status: 'incoming' as const,
    };

    try {
      await firstValueFrom(this.bookingsService.post(payload));
      this.sessionService.updateBooking({date: '', time: '', diners: '1'});
      this.confirmationName.set(restaurant.name);
      this.confirmationAddress.set(restaurant.address);
      this.confirmationDatetime.set(payload.datetime);
      this.confirmationMapUrl.set(this.osmUrl(restaurant.coordinates));
      this.confirmationOpen.set(true);
    } catch (e) {
      console.error('Failed to complete booking:', e);
    }
  }

  closeConfirmation() {
    this.confirmationOpen.set(false);
    this.router.navigate(['/']);
  }
}
