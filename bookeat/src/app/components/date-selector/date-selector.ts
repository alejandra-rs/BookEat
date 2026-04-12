  import {Component, output, signal} from '@angular/core';
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
    selectedDate = signal<NgbDate|null>(null);
    dateSelected = output<NgbDate | null>()
    onDateSelected(date: NgbDate) {
      this.selectedDate.set(date);
      this.dateSelected.emit(date);
    }
  }
