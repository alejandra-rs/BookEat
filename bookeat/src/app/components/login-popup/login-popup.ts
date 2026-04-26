import {Component, inject, input, output, signal} from '@angular/core';
import {FormCard} from '../form-card/form-card';
import {INITIAL_LOGIN_STATE, loginFields, loginForm} from '../../models/login.model';
import {TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {form, FormField} from '@angular/forms/signals';
import {applyLoginValidators} from '../../validators/login-popup.validators';
import {AuthService} from '../../services/firebase/auth.service';

@Component({
  selector: 'app-login-popup',
  imports: [FormCard, TitleCasePipe, FormsModule, FormField],
  templateUrl: './login-popup.html',
  styleUrl: './login-popup.css',
})
export class LoginPopup {
  private authService = inject(AuthService);

  open = input(false);
  closed = output<void>();
  openRegister = output<void>();

  error = signal<string | null>(null);
  loginModel = signal<loginForm>(INITIAL_LOGIN_STATE);
  submitted = signal(false);

  fields = loginFields;
  loginForm = form(this.loginModel, (path) => applyLoginValidators(path));

  close() { this.closed.emit(); }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.error.set(null);
    this.submitted.set(true);
    try {
      await this.authService.login(this.loginModel())
        .then(() => { this.close(); this.submitted.set(false); })
        .catch((err) => { this.error.set(err); });
    } catch (err: any) {
      this.error.set(err.message || 'An error occurred while trying to log in');
    } finally {
      this.submitted.set(false);
    }
  }
}
