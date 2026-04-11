import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MenuSection } from '../menu-section/menu-section';

@Component({
  selector: 'app-menu-popup',
  imports: [MenuSection],
  templateUrl: './menu-popup.html',
  styleUrl: './menu-popup.css',
})
export class MenuPopup {
  @Input() sections: MenuSection[] = [];

  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  open() {
    this.dialogRef.nativeElement.showModal();
  }
  close() {
    this.dialogRef.nativeElement.close();
  }
  closeOnBackdrop(event: MouseEvent) {
    const rect = this.dialogRef.nativeElement.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) this.close();
  }
}
