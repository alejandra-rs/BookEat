import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {InsertImage} from '../insert-image/insert-image';
import {UsersService} from '../../services/firebase/users.service';
import {AuthService} from '../../services/firebase/auth.service';

@Component({
  selector: 'app-edit-profile-image-popup',
  imports: [InsertImage],
  templateUrl: './edit-profile-image-popup.html',
  styleUrl: './edit-profile-image-popup.css',
})
export class EditProfileImagePopup {
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private session = this.authService.currentUser();

  @ViewChild('DialogEditProfileImage') dialogRef!: ElementRef<HTMLDialogElement>;

  pendingUrl = signal<string>('');

  open() { this.dialogRef.nativeElement.showModal(); }
  close() { this.dialogRef.nativeElement.close(); }

  save() {
    const url = this.pendingUrl();
    if (!url || !this.session) return;
    this.usersService.patch(this.session.id, this.session.role, { image: url }).subscribe();
    this.authService.updateImage(url);
    this.close();
  }
}
