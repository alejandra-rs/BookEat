import { Component } from '@angular/core';
import {DateSelector} from '../date-selector/date-selector';
import {HourSelector} from '../hour-selector/hour-selector';
import {DinersSelector} from '../diners-selector/diners-selector';

@Component({
  selector: 'app-header',
  imports: [
    DateSelector,
    HourSelector,
    DinersSelector
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
