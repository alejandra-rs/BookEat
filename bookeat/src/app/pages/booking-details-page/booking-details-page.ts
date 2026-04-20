import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RestaurantsService } from '../../services/jsonserver/restaurants.service';
import { SessionService } from '../../services/jsonserver/session.service';
import { DinersSelector } from '../../components/diners-selector/diners-selector';
import { HourTable } from '../../components/hour-table/hour-table';
import { OpeningHours, Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-booking-details-page',
  imports: [RouterLink, NgbDatepicker, FormsModule, DinersSelector, HourTable],
  templateUrl: './booking-details-page.html',
  styleUrl: './booking-details-page.css',
})
export class BookingDetailsPage {
  private restaurantsService = inject(RestaurantsService);
  private sessionService = inject(SessionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  restaurant = signal<Restaurant | null>(null);

  selectedDate = computed<NgbDate | null>(() => {
    const date = this.sessionService.booking().date;
    if (!date) return null;
    const [y, m, d] = date.split('-');
    return new NgbDate(+y, +m, +d);
  });

  selectedTime = computed(() => this.sessionService.booking().time || null);
  canConfirm = computed(() => !!this.sessionService.booking().date &&
                                                !!this.sessionService.booking().time && this.isWithinBounds());

  readonly minDate: NgbDate;

  private readonly dayMap: Record<number, keyof OpeningHours> = {
    0: 'D', 1: 'L', 2: 'M', 3: 'X', 4: 'J', 5: 'V', 6: 'S'
  };

  constructor() {
    const today = new Date();
    this.minDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    this.restaurantsService.getById(this.id).subscribe(r => this.restaurant.set(r));
  }

  isWithinBounds() {
    return true;
  }

  isDateDisabled = (date: NgbDateStruct) => {
    if (!this.restaurant()) return false;
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const dayLetter = this.dayMap[jsDate.getDay()];
    const hours = this.restaurant()!.hours[dayLetter];
    return !hours || hours.length === 0;
  };

  onDateSelected(date: NgbDate) {
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    this.sessionService.updateBooking({ date: `${date.year}-${month}-${day}`, time: '' });
  }

  onTimeSelected(time: string) {
    this.sessionService.updateBooking({ time });
  }

  selectTable() {
    if (!this.canConfirm()) return;
    this.router.navigate(['/book-table', this.id]).then();
  }
}
