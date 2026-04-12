import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormCard } from '../form-card/form-card';
import { INITIAL_LOGIN_STATE, loginFields, loginForm } from '../../models/login.model';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { applyLoginValidators } from '../../validators/login-popup.validators';

@Component({
  selector: 'app-login-popup',
  imports: [FormCard, TitleCasePipe, FormsModule, FormField],
  templateUrl: './login-popup.html',
  styleUrl: './login-popup.css',
})
export class LoginPopup {
  loginModel = signal<loginForm>(INITIAL_LOGIN_STATE);
  submitted = signal(false);

  @ViewChild('DialogLogin') dialogRef!: ElementRef<HTMLDialogElement>;

  fields = loginFields;
  loginForm = form(this.loginModel, (path) => {
    applyLoginValidators(path);
  });

  open() {
    console.log('Opening login dialog');
    console.log('Dialog reference:', this.dialogRef);
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

  async onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);

    if (this.loginForm().invalid()) {
      return;
    }

    console.log('Login successful');
  }
}
