import {Component, inject, input, output, signal} from '@angular/core';
import {InsertImage} from '../insert-image/insert-image';
import {UsersService} from '../../services/firebase/users.service';
import {AuthService} from '../../services/firebase/auth.service';
import {Storage, ref, uploadBytes, getDownloadURL} from '@angular/fire/storage';

@Component({
  selector: 'app-edit-profile-image-popup',
  imports: [InsertImage],
  templateUrl: './edit-profile-image-popup.html',
  styleUrl: './edit-profile-image-popup.css',
})
export class EditProfileImagePopup {
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private storage = inject(Storage);
  private session = this.authService.currentUser;

  open = input(false);
  closed = output<void>();

  pendingFile = signal<File | null>(null);
  saving = signal(false);
  saveError = signal<string | null>(null);

  close() { this.closed.emit(); }

  async save() {
    const file = this.pendingFile();
    const session = this.session();
    if (!file || !session || this.saving()) return;

    this.saving.set(true);
    this.saveError.set(null);
    try {
      const storageRef = ref(this.storage, `profiles/${session.id}_${Date.now()}_${file.name}`);
      const result = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(result.ref);
      this.usersService.patch(session.id, session.role, { image: url }).subscribe();
      this.authService.updateImage(url);
      this.close();
    } catch (e: any) {
      this.saveError.set(e?.message ?? 'Upload failed. Check Firebase Storage permissions.');
    } finally {
      this.saving.set(false);
    }
  }
}
