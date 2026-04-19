import {Component, computed, inject, viewChild} from '@angular/core';
import {EditProperty} from '../../components/edit-property/edit-property';
import {EditButton} from '../../components/edit-button/edit-button';
import {AuthService} from '../../services/jsonserver/auth.service';
import {UsersService} from '../../services/jsonserver/users.service';
import {AsyncPipe} from '@angular/common';
import {LoginPopup} from '../../components/login-popup/login-popup';
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
  private session = this.authService.currentUser();
  readonly currentUser$ = this.usersService.getById(this.session?.id!, this.session?.role!);
  readonly profileImage = computed(() => this.authService.currentUser()?.image ?? '');

  popup = viewChild.required(EditProfileImagePopup);

  openPopup() {
    this.popup().open();
  }
}
