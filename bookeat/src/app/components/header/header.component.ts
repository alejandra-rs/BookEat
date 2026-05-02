import {Component, inject, signal} from '@angular/core';
import {DateSelector} from '../date-selector/date-selector.component';
import {HourSelector} from '../hour-selector/hour-selector.component';
import {DinersSelector} from '../diners-selector/diners-selector.component';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {LoginPopup} from '../login-popup/login-popup.component';
import {AuthService} from '../../services/firebase/auth.service';
import {MyAccount} from '../my-account/my-account.component';
import {CreateAnAccount} from '../create-an-account/create-an-account.component';
import {SessionService} from '../../services/session.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map, startWith} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [DateSelector, HourSelector, DinersSelector, RouterLink, LoginPopup, MyAccount, CreateAnAccount],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class Header {
  public authService = inject(AuthService);
  public sessionService = inject(SessionService);
  private router = inject(Router);

  loginOpen = signal(false);
  registerOpen = signal(false);

  private isBookingRoute = () =>
    this.router.url.startsWith('/booking-details') || this.router.url.startsWith('/book-table');

  readonly userIsBooking = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.isBookingRoute()),
      startWith(this.isBookingRoute())
    ),
    { initialValue: false }
  );

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query.trim() } });
  }

  openLogin() { this.loginOpen.set(true); }
  openRegister() { this.registerOpen.set(true); }
}
