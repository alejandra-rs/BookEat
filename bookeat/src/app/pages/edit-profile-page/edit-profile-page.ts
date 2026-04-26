import {Component, computed, inject, signal} from '@angular/core';
import {EditProperty} from '../../components/edit-property/edit-property';
import {EditButton} from '../../components/edit-button/edit-button';
import {AuthService} from '../../services/jsonserver/auth.service';
import {UsersService} from '../../services/firebase/users.service';
import {AsyncPipe} from '@angular/common';
import {EditProfileImagePopup} from '../../components/edit-profile-image-popup/edit-profile-image-popup';

@Component({
  selector: 'app-edit-profile-page',
  imports: [EditProperty, EditButton, AsyncPipe, EditProfileImagePopup],
  templateUrl: './edit-profile-page.html',
  styleUrl: './edit-profile-page.css',
})
export class EditProfilePage {
  private authService = inject(AuthService);
  private usersService = inject(UsersService);
  private session = this.authService.currentUser;
  readonly currentUser$ = this.usersService.getById(this.session()?.id!, this.session()?.role!);
  readonly profileImage = computed(() => this.authService.currentUser()?.image ?? '');

  popupOpen = signal(false);
}
