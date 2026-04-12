import { email, pattern, required, validate } from '@angular/forms/signals';
import {
  PHONE_PATTERN,
  POSTAL_CODE_PATTERN,
} from '../components/affiliate-form/affiliate-form.constants';
import { affiliateFields } from '../models/affiliate.model';

export function applyAffiliateFormValidators(path: any): void {
  affiliateFields.forEach((field) => {
    required(path[field], {
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
    });
  });

  email(path.email);

  pattern(path.phoneNumber, PHONE_PATTERN, { message: 'Phone number must have exactly 9 digits' });

  validate(path.confirmPassword, ({ value, valueOf }) => {
    if (value() !== valueOf(path.password)) {
      return { kind: 'mismatch' };
    }
    return undefined;
  });

  pattern(path.postalCode, POSTAL_CODE_PATTERN, {
    message: 'Postal Code must have exactly 5 digits',
  });

  validate(path.tags, ({ value }) => {
    const tags = value();

    if (!Array.isArray(tags) || tags.length === 0) {
      return {
        kind: 'required',
        message: 'You must add at least one tag.',
      };
    }
    return undefined;
  });
}
