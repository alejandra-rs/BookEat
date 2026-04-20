import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Restaurant} from '../../models/restaurant.model';
import {User} from '../../models/users.model';
import {BookingExpanded} from '../../models/booking.model';

@Component({
  selector: 'app-overview',
  imports: [
    RouterLink
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})

export class Overview {
  item = input.required<Restaurant|User>()
  booking = input<BookingExpanded|null>(null)
  type = input<string>('default');
}
