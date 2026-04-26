import { Component, computed, inject, input, output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

export interface DateRangeValue {
  start: string;
  end: string;
}

function toIso(d: NgbDateStruct): string {
  return `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
}

@Component({
  selector: 'app-date-range',
  imports: [NgbInputDatepicker, FormsModule],
  templateUrl: './date-range.html',
  styleUrl: './date-range.css',
})
export class DateRange {
  private calendar = inject(NgbCalendar);

  type = input<string | null>(null);
  rangeChange = output<DateRangeValue | null>();

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  readonly minDate = computed<NgbDate | undefined>(() =>
    this.type() === 'incoming' ? this.calendar.getToday() : undefined
  );

  readonly maxDate = computed<NgbDate | undefined>(() =>
    this.type() === 'past' ? this.calendar.getToday() : undefined
  );

  get label(): string {
    if (this.fromDate && this.toDate) return `${toIso(this.fromDate)}  —  ${toIso(this.toDate)}`;
    if (this.fromDate) return `${toIso(this.fromDate)}  —  ...`;
    return 'Filter by date';
  }

  get hasSelection(): boolean { return !!this.fromDate; }

  isFrom(date: NgbDate) { return date.equals(this.fromDate); }
  isTo(date: NgbDate) { return date.equals(this.toDate); }

  isInside(date: NgbDate) {
    return !!(this.toDate && this.fromDate && date.after(this.fromDate) && date.before(this.toDate));
  }

  isRange(date: NgbDate) {
    return this.isFrom(date) || this.isTo(date) || this.isInside(date) ||
      !!(this.hoveredDate && this.fromDate && !this.toDate &&
         date.after(this.fromDate) && date.before(this.hoveredDate));
  }

  onDateSelect(date: NgbDate) {
    if (!this.fromDate && !this.toDate) this.fromDate = date;
    else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.rangeChange.emit({ start: toIso(this.fromDate), end: toIso(this.toDate) });
    } else {
      this.toDate = null; this.fromDate = date;
    }
  }

  clear(event: MouseEvent, picker: NgbInputDatepicker) {
    event.stopPropagation();
    this.fromDate = null; this.toDate = null; this.hoveredDate = null;
    picker.close();
    this.rangeChange.emit(null);
  }
}
