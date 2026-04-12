import {Component, inject, viewChild, ViewChild} from '@angular/core';
import { DateSelector } from '../date-selector/date-selector';
import { HourSelector } from '../hour-selector/hour-selector';
import { DinersSelector } from '../diners-selector/diners-selector';
import { RouterLink } from '@angular/router';
import { LoginPopup } from '../login-popup/login-popup';
import { AuthService } from '../../services/jsonserver/auth.service';
import { MyAccount } from '../my-account/my-account';
import {CreateAnAccount} from '../create-an-account/create-an-account';

@Component({
  selector: 'app-header',
  imports: [DateSelector, HourSelector, DinersSelector, RouterLink, LoginPopup, MyAccount, CreateAnAccount],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public authService = inject(AuthService);
  registerPopup = viewChild.required(CreateAnAccount)
  loginPopup = viewChild.required(LoginPopup)
  openLogin() {
    this.loginPopup().open();
  }

  openRegister() {
    this.registerPopup().open();
  }
}
