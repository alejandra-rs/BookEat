import { Component, inject, signal } from '@angular/core';
import { Overview } from '../../components/overview/overview';
import { DateRange, DateRangeValue } from '../../components/date-range/date-range';
import { BookingsService } from '../../services/jsonserver/bookings.service';
import { AuthService } from '../../services/firebase/auth.service';
import { ActivatedRoute } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UsersService } from '../../services/firebase/users.service';
import { RestaurantsService } from '../../services/firebase/restaurants.service';
import { combineLatest, filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-reservations-page',
  imports: [Overview, DateRange],
  templateUrl: './reservations-page.html',
  styleUrl: './reservations-page.css',
})
export class ReservationsPage {
  private route = inject(ActivatedRoute);
  private bookingService = inject(BookingsService);
  private authService = inject(AuthService);
  private userService = inject(UsersService);
  private restaurantsService = inject(RestaurantsService);

  private user$ = this.authService.currentUser;

  private itemObservable$ = toObservable(this.user$).pipe(
    filter(user => !!user),
    switchMap(user =>
      user!.role === 'USER'
        ? this.userService.getById(user!.id, 'USER')
        : this.restaurantsService.getById(user!.id)
    )
  );

  private timeParam$ = this.route.queryParamMap.pipe(map(p => p.get('time')));

  private bookings$ = this.timeParam$.pipe(
    switchMap(time => this.bookingService.getReservation(time!))
  );

  dateRange = signal<DateRangeValue | null>(null);

  private filtered$ = combineLatest([this.bookings$, toObservable(this.dateRange)]).pipe(
    map(([bookings, range]) => {
      if (!range) return bookings;
      return bookings.filter(b => {
        const date = b.datetime.split(' ')[0];
        return date >= range.start && date <= range.end;
      });
    })
  );

  readonly type = toSignal(this.timeParam$, { initialValue: null });
  readonly bookings = toSignal(this.filtered$, { initialValue: [] });
  readonly item = toSignal(this.itemObservable$);
}
