import {Component, inject} from '@angular/core';
import {Overview} from '../../components/overview/overview';
import {BookingsService} from '../../services/jsonserver/bookings.service';
import {AuthService} from '../../services/jsonserver/auth.service';
import {ActivatedRoute} from '@angular/router';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {UsersService} from '../../services/jsonserver/users.service';
import {RestaurantsService} from '../../services/jsonserver/restaurants.service';
import {filter, map, switchMap} from 'rxjs';

@Component({
  selector: 'app-reservations-page',
  imports: [
    Overview,
  ],
  templateUrl: './reservations-page.html',
  styleUrl: './reservations-page.css',
})
export class ReservationsPage {
  private route = inject(ActivatedRoute)
  private bookingService= inject(BookingsService);
  private authService= inject(AuthService);
  private userService= inject(UsersService);
  private restaurantsService= inject(RestaurantsService);

  private user$ = this.authService.currentUser;

  private userObservable$ = toObservable(this.user$);

  private itemObservable$ = this.userObservable$.pipe(
    filter(user => !!user && Number(user.id) !== 0),

    switchMap(user => {
      if (user!.role === 'USER') {
        return this.userService.getById(user!.id, "USER");
      }
      return this.restaurantsService.getById(Number(user!.id));
    })
  );

  private timeParamObservable$ = this.route.queryParamMap.pipe(
    map(params => params.get('time'))
  );

  private bookingsObservable$ = this.timeParamObservable$.pipe(
    switchMap(time => {
      return this.bookingService.getReservation(time!);
    })
  );

  readonly type = toSignal(this.timeParamObservable$)
  readonly bookings = toSignal(this.bookingsObservable$, { initialValue: [] });
  readonly item = toSignal(this.itemObservable$);
}
