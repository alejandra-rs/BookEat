import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-booking-confirmation',
  imports: [],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css',
})
export class BookingConfirmation {
  @Input() name: string = '';
  @Input() address: string = '';
  @Input() datetime: string = '';
  @ViewChild('bookingPopup') dialogRef!: ElementRef<HTMLDialogElement>;

  open() {
    this.dialogRef.nativeElement.showModal();
  }
  close(){
    this.dialogRef.nativeElement.close();
  }

  protected closeOnBackdrop(event: PointerEvent) {
    const rect = this.dialogRef.nativeElement.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) this.close();
  }
}
