import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { User } from '../../models/users.model';
import { BookingExpanded } from '../../models/booking.model';
import { WriteReviewPopup } from '../write-review-popup/write-review-popup.component';
import { ReservationContainerPopup } from '../reservation-container-popup/reservation-container-popup.component';

@Component({
  standalone: true,
  selector: 'app-overview',
  imports: [RouterLink, WriteReviewPopup, ReservationContainerPopup],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class Overview {
  item = input.required<Restaurant | User>();
  booking = input<BookingExpanded | null>(null);
  type = input<string>('default');
  showModal = signal(false);
}
