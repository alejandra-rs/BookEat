import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

export const PHONE_PATTERN = /^[0-9]{9}$/;

export const passwordValidators: ValidatorFn[] = [
  Validators.required,
  Validators.minLength(8),
];

export const phoneValidators: ValidatorFn[] = [
  Validators.required,
  Validators.pattern(PHONE_PATTERN),
];

export const emailValidators: ValidatorFn[] = [
  Validators.required,
  Validators.email,
];

export function birthdateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const birthdate = new Date(control.value);
    const today = new Date();
    const age18 = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const age99 = new Date(today.getFullYear() - 99, today.getMonth(), today.getDate());
    if (birthdate > age18) return { underage: 'Debes ser mayor de 18 años' };
    if (birthdate < age99) return { overage: 'La edad no puede superar los 99 años' };
    return null;
  };
}

export function passwordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (pass && confirm && pass !== confirm) {
      return { mismatch: 'La contraseña debe coincidir' };
    }
    return null;
  };
}
