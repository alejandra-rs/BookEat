import {Component, inject, input, output, signal} from '@angular/core';
import {FormCard} from '../form-card/form-card.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/firebase/auth.service';

@Component({
  standalone: true,
  selector: 'app-login-popup',
  imports: [FormCard, ReactiveFormsModule],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css',
})
export class LoginPopup {
  private authService = inject(AuthService);

  open = input(false);
  closed = output<void>();
  openRegister = output<void>();

  error = signal<string | null>(null);
  submitted = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get emailCtrl() { return this.loginForm.get('email')!; }
  get passwordCtrl() { return this.loginForm.get('password')!; }

  showErrors(controlName: string): boolean {
    const ctrl = this.loginForm.get(controlName)!;
    return ctrl.invalid && (ctrl.touched || this.submitted());
  }

  close() { this.closed.emit(); }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.close();
    } catch (e: any) {
      if (e.code !== 'auth/popup-closed-by-user') this.error.set('Google sign-in failed. Please try again.');
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
    this.error.set(null);
    if (this.loginForm.invalid) return;
    try {
      await this.authService.login({ email: this.emailCtrl.value!, password: this.passwordCtrl.value! });
      this.close();
    } catch (err: any) {
      this.error.set(err.message || 'An error occurred while trying to log in');
    } finally {
      this.submitted.set(false);
    }
  }
}
