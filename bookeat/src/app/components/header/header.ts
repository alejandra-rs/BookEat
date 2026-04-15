import { Component, inject, ViewChild } from '@angular/core';
import { DateSelector } from '../date-selector/date-selector';
import { HourSelector } from '../hour-selector/hour-selector';
import { DinersSelector } from '../diners-selector/diners-selector';
import { RouterLink } from '@angular/router';
import { LoginPopup } from '../login-popup/login-popup';
import { AuthService } from '../../services/jsonserver/auth.service';
import { UserMenu } from '../user-account-popup/user-menu';
import {SessionService} from '../../services/jsonserver/session.service';

@Component({
  selector: 'app-header',
  imports: [DateSelector, HourSelector, DinersSelector, RouterLink, LoginPopup, UserMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public authService = inject(AuthService);
  public sessionService = inject(SessionService);
  @ViewChild('loginPopup') loginPopup!: LoginPopup;

  openLogin() {
    this.loginPopup.open();
  }
}
