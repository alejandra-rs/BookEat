import { Component } from '@angular/core';
import {NgbDate, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-date-selector',
  imports: [
    NgbInputDatepicker,
    FormsModule
  ],
  templateUrl: './date-selector.html',
  styleUrl: './date-selector.css',
})
export class DateSelector {
  selectedDate: NgbDate | null = null;

  onDateSelected(date: NgbDate) {
    this.selectedDate = date;
  }
}
