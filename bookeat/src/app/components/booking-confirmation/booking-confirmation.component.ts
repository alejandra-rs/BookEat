import {Component, input, output} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-booking-confirmation',
  imports: [],
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.css',
})
export class BookingConfirmation {
  open = input(false);
  closed = output<void>();

  name = input('');
  address = input('');
  datetime = input('');
  mapUrl = input<SafeResourceUrl | null>(null);

  close() { this.closed.emit(); }
}
