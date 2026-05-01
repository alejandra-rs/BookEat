import {
  Component,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { effect } from '@angular/core';
import { TableMap } from '../../models/restaurant.model';
import { BookingExpanded } from '../../models/booking.model';
import { RestaurantsService } from '../../services/firebase/restaurants.service';
import { TableMapComponent } from '../table-map/table-map';

@Component({
  selector: 'app-reservation-container-popup',
  imports: [TableMapComponent],
  templateUrl: './reservation-container-popup.component.html',
  styleUrl: './reservation-container-popup.component.css',
})
export class ReservationContainerPopup {
  reserva = input.required<BookingExpanded>();
  open = model<boolean>(false);
  closed = output<void>();
  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('tableDialog');

  constructor() {
    effect(() => {
      const el = this.dialog().nativeElement;
      if (this.open()) {
        el.showModal();
        document.body.style.overflow = 'hidden';
      } else {
        el.close();
        document.body.style.overflow = '';
      }
    });
  }

  close() {
    this.open.set(false);
    this.closed.emit();
  }
}
