import {Component, effect} from '@angular/core';
import {NgbDate, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SessionService} from '../../services/jsonserver/session.service';

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

  constructor(public sessionService: SessionService) {
    effect(() => {
      const stateDate =  this.sessionService.booking().date;
      if (stateDate) {
        const [y, m, d] = stateDate.split('-');
        this.selectedDate = new NgbDate(parseInt(y,10), parseInt(m,10), parseInt(d,10));
      }
    });
  }

  onDateSelected(date: NgbDate) {
    this.selectedDate = date;
    const year = date.year
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    this.sessionService.updateBooking({ date: `${year}-${month}-${day}` });
  }
}
