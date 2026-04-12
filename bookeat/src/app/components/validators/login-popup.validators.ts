import { email, required } from '@angular/forms/signals';

export function applyLoginValidators(path: any): void {
  required(path.email, { message: 'Email is required' });
  email(path.email);

  required(path.password, { message: 'Password is required' });
}

