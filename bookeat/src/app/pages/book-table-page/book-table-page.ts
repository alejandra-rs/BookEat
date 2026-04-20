import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantsService } from '../../services/firebase/restaurants.service';
import { BookingsService } from '../../services/jsonserver/bookings.service';
import { AuthService } from '../../services/jsonserver/auth.service';
import { SessionService } from '../../services/session.service';
import { TableMapComponent } from '../../components/table-map/table-map';
import { LoginPopup } from '../../components/login-popup/login-popup';
import { Restaurant } from '../../models/restaurant.model';
import {firstValueFrom} from 'rxjs';
import {Booking} from '../../models/booking.model';

interface ConfirmationData {
  restaurantName: string;
  datetime: string;
  address: string;
}

@Component({
  selector: 'app-book-table-page',
  imports: [RouterLink, TableMapComponent, LoginPopup],
  templateUrl: './book-table-page.html',
  styleUrl: './book-table-page.css',
})
export class BookTablePage {
  private route = inject(ActivatedRoute);
  private restaurantsService = inject(RestaurantsService);
  private bookingsService = inject(BookingsService);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);

  readonly id = String(this.route.snapshot.paramMap.get('id'));
  restaurant = signal<Restaurant | null>(null);
  occupiedIds = signal<number[]>([]);
  selectedTables = signal<Set<number>>(new Set());
  confirmation = signal<ConfirmationData | null>(null);

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

  async bookSelected() {
    const user = this.authService.currentUser();
    const restaurant = this.restaurant();
    if (!user || !restaurant || this.selectedTables().size === 0) return;

    const booking = this.sessionService.booking();
    const payload: Omit<Booking, 'id'>= {
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
      this.sessionService.updateBooking({ date: '', time: '', diners: '1' });
      this.confirmation.set({
        restaurantName: restaurant.name,
        datetime: payload.datetime,
        address: restaurant.address,
      });
    } catch {
      console.error('Failed to complete booking. Please try again.');
    }
  }

}
