import {ValidatorFn, Validators} from '@angular/forms';

export const loginEmailValidators: ValidatorFn[] = [Validators.required, Validators.email];
export const loginPasswordValidators: ValidatorFn[] = [Validators.required];
