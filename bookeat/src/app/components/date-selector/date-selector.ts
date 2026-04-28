import { Component, effect, signal } from '@angular/core';
import { NgbDate, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';

@Component({
  standalone: true,
  selector: 'app-date-selector',
  imports: [NgbInputDatepicker, FormsModule],
  templateUrl: './date-selector.html',
  styleUrl: './date-selector.css',
})
export class DateSelector {
  selectedDate = signal<NgbDate | null>(null);
  readonly minDate: NgbDate;

  constructor(public sessionService: SessionService) {
    const today = new Date();
    this.minDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());

    effect(() => {
      const stateDate = this.sessionService.booking().date;
      if (stateDate) {
        const [y, m, d] = stateDate.split('-');
        this.selectedDate.set(new NgbDate(+y, +m, +d));
      } else {
        this.selectedDate.set(null);
      }
    });
  }

  onDateSelected(date: NgbDate) {
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    this.sessionService.updateBooking({ date: `${date.year}-${month}-${day}` });
  }
}
