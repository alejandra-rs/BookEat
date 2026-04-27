import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {PHONE_PATTERN, POSTAL_CODE_PATTERN} from '../components/affiliate-form/affiliate-form.constants';

export function affiliatePasswordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (pass && confirm && pass !== confirm) {
      return { mismatch: 'Passwords do not match.' };
    }
    return null;
  };
}

export function tagsRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tags = control.value as string[];
    if (!Array.isArray(tags) || tags.length === 0) {
      return { required: 'You must add at least one tag.' };
    }
    return null;
  };
}

export const affiliatePhoneValidators: ValidatorFn[] = [
  Validators.required,
  Validators.pattern(PHONE_PATTERN),
];

export const affiliatePostalCodeValidators: ValidatorFn[] = [
  Validators.required,
  Validators.pattern(POSTAL_CODE_PATTERN),
];
