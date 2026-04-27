import {Component, inject, input, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/firebase/auth.service';
import {FormCard} from '../form-card/form-card';
import {
  birthdateValidator,
  emailValidators,
  passwordsMatchValidator,
  passwordValidators,
  phoneValidators,
} from '../../validators/form.validators';

@Component({
  selector: 'app-create-an-account',
  standalone: true,
  imports: [ReactiveFormsModule, FormCard],
  templateUrl: './create-an-account.html',
  styleUrl: './create-an-account.css',
})
export class CreateAnAccount {
  private authService = inject(AuthService);

  open = input(false);
  closed = output<void>();
  openLogin = output<void>();

  submitted = signal(false);
  error = signal<string | null>(null);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', phoneValidators),
    birthdate: new FormControl('', [Validators.required, birthdateValidator()]),
    email: new FormControl('', emailValidators),
    password: new FormControl('', passwordValidators),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: passwordsMatchValidator() });

  errors(controlName: string): string[] {
    const ctrl = this.registerForm.get(controlName)!;
    if (!ctrl.invalid || (!ctrl.touched && !this.submitted())) return [];
    const result: string[] = [];
    const errs = ctrl.errors ?? {};
    for (const [key, val] of Object.entries(errs)) {
      if (typeof val === 'string') { result.push(val); continue; }
      if (key === 'required') result.push('This field is required');
      else if (key === 'minlength') result.push(`Debe tener al menos ${val.requiredLength} caracteres`);
      else if (key === 'pattern') result.push('El telefono es obligatorio, de 9 digitos');
      else if (key === 'email') result.push('El email tiene que ser válido');
    }
    if (controlName === 'confirmPassword' && this.registerForm.hasError('mismatch')) {
      result.push(this.registerForm.errors!['mismatch']);
    }
    return result;
  }

  close() { this.closed.emit(); }

  async onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.submitted.set(true);
    if (this.registerForm.invalid) return;

    const f = this.registerForm.value;
    try {
      await this.authService.register({
        name: f.name!, surname: f.surname!,
        email: f.email!, password: f.password!,
        phoneNumber: f.phoneNumber!, birthdate: f.birthdate!,
      });
      this.close();
    } catch (e: any) {
      this.error.set(this.friendlyError(e.code));
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.close();
    } catch (e: any) {
      this.error.set(this.friendlyError(e.code));
    }
  }

  private friendlyError(code: string): string {
    if (code === 'auth/email-already-in-use') return 'This email is already registered.';
    if (code === 'auth/weak-password') return 'Password must be at least 6 characters.';
    if (code === 'auth/popup-closed-by-user') return '';
    return 'Something went wrong. Please try again.';
  }
}
