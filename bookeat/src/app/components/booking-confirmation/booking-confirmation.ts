import {Component, input, output} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-booking-confirmation',
  imports: [],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css',
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
