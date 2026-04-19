import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {InsertImage} from '../insert-image/insert-image';
import {UsersService} from '../../services/jsonserver/users.service';
import {AuthService} from '../../services/jsonserver/auth.service';

@Component({
  selector: 'app-edit-profile-image-popup',
  imports: [InsertImage],
  templateUrl: './edit-profile-image-popup.html',
  styleUrl: './edit-profile-image-popup.css',
})
export class EditProfileImagePopup {
  private usersService = inject(UsersService);
  private session = inject(AuthService).currentUser();

  @ViewChild('DialogEditProfileImage') dialogRef!: ElementRef<HTMLDialogElement>;

  pendingUrl = signal<string>('');

  open() { this.dialogRef.nativeElement.showModal(); }
  close() { this.dialogRef.nativeElement.close(); }

  closeOnBackdrop(event: MouseEvent) {
    const rect = this.dialogRef.nativeElement.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top  || event.clientY > rect.bottom;
    if (clickedOutside) this.close();
  }

  save() {
    const url = this.pendingUrl();
    if (!url || !this.session) return;
    this.usersService.patch(this.session.id, this.session.role, { image: url }).subscribe();
    this.close();
  }
}
