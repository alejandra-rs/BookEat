import { Component, ViewChild } from '@angular/core';
import { DateSelector } from '../date-selector/date-selector';
import { HourSelector } from '../hour-selector/hour-selector';
import { DinersSelector } from '../diners-selector/diners-selector';
import { RouterLink } from '@angular/router';
import { LoginPopup } from '../login-popup/login-popup';

@Component({
  selector: 'app-header',
  imports: [DateSelector, HourSelector, DinersSelector, RouterLink, LoginPopup],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @ViewChild(LoginPopup) loginPopup!: LoginPopup;
  openLogin() {
    this.loginPopup.open();
  }
}
