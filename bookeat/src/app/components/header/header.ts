import { Component, inject, viewChild } from '@angular/core';
import { DateSelector } from '../date-selector/date-selector';
import { HourSelector } from '../hour-selector/hour-selector';
import { DinersSelector } from '../diners-selector/diners-selector';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LoginPopup } from '../login-popup/login-popup';
import { AuthService } from '../../services/jsonserver/auth.service';
import { MyAccount } from '../my-account/my-account';
import { CreateAnAccount } from '../create-an-account/create-an-account';
import { SessionService } from '../../services/session.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [DateSelector, HourSelector, DinersSelector, RouterLink, LoginPopup, MyAccount, CreateAnAccount],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public authService = inject(AuthService);
  public sessionService = inject(SessionService);
  private router = inject(Router);
  registerPopup = viewChild.required(CreateAnAccount);
  loginPopup = viewChild.required(LoginPopup);

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

  openLogin() {
    this.loginPopup().open();
  }

  openRegister() {
    this.registerPopup().open();
  }
}
