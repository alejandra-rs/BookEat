import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormCard} from '../form-card/form-card.component';
import {type AffiliateForm} from '../../models/affiliate.model';
import {areSameTag, toTitleCase} from '../../pipes/canonicalize-tag.pipe';
import {TitleCasePipe} from '@angular/common';
import {AuthService} from '../../services/firebase/auth.service';
import {Router} from '@angular/router';
import {CategoriesService} from '../../services/firebase/categories.service';
import {PHONE_PATTERN, POSTAL_CODE_PATTERN} from './affiliate-form.constants';
import {affiliatePasswordsMatchValidator, tagsRequiredValidator} from '../../validators/affiliate-form.validators';

@Component({
  selector: 'app-affiliate-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormCard, TitleCasePipe],
  templateUrl: './affiliate-form.component.html',
})
export class AffiliateFormComponent {
  private authService = inject(AuthService);
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  availableTags = this.categoriesService.categories;
  submitted = signal(false);
  error = signal<string | null>(null);
  tags = signal<string[]>([]);

  affiliateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(PHONE_PATTERN)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
    restaurantName: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required, Validators.pattern(POSTAL_CODE_PATTERN)]),
    tags: new FormControl<string[]>([], [tagsRequiredValidator()]),
  }, { validators: affiliatePasswordsMatchValidator() });

  fieldErrors(controlName: string): string[] {
    const ctrl = this.affiliateForm.get(controlName)!;
    const hasMismatch = controlName === 'confirmPassword' && this.affiliateForm.hasError('mismatch');
    if ((!ctrl.invalid && !hasMismatch) || (!ctrl.touched && !this.submitted())) return [];
    const result: string[] = [];
    for (const [key, val] of Object.entries(ctrl.errors ?? {})) {
      if (typeof val === 'string') { result.push(val); continue; }
      if (key === 'required') result.push('This field is required.');
      else if (key === 'minlength') result.push(`Must be at least ${val.requiredLength} characters.`);
      else if (key === 'pattern') {
        if (controlName === 'phoneNumber') result.push('Phone number must have exactly 9 digits.');
        else if (controlName === 'postalCode') result.push('Postal code must have exactly 5 digits.');
      }
      else if (key === 'email') result.push('Please enter a valid email address.');
    }
    if (controlName === 'confirmPassword' && this.affiliateForm.hasError('mismatch')) {
      result.push(this.affiliateForm.errors!['mismatch']);
    }
    return result;
  }

  showErrors(controlName: string): boolean {
    const ctrl = this.affiliateForm.get(controlName)!;
    const hasMismatch = controlName === 'confirmPassword' && this.affiliateForm.hasError('mismatch');
    const touchedOrSubmitted = controlName === 'tags' ? this.submitted() : (ctrl.touched || this.submitted());
    return (ctrl.invalid || hasMismatch) && touchedOrSubmitted;
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
    this.affiliateForm.get('tags')!.setValue(this.tags());
    if (this.affiliateForm.invalid) return;
    this.error.set(null);
    try {
      const f = this.affiliateForm.value;
      const payload: AffiliateForm = {
        name: f.name!, surname: f.surname!, email: f.email!,
        phoneNumber: f.phoneNumber!, password: f.password!, confirmPassword: f.confirmPassword!,
        restaurantName: f.restaurantName!, addressLine1: f.addressLine1!, addressLine2: f.addressLine2 ?? '',
        city: f.city!, province: f.province!, postalCode: f.postalCode!, tags: f.tags!,
      };
      await this.authService.postRestaurantProfile(payload);
      await this.router.navigate(['/']);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  }

  getTagName(id: string): string {
    const category = this.categoriesService.categories().find(c => c.id.toString() === id);
    return category ? category.name : 'Loading...';
  }

  async addTag(nameValue: string) {
    const name = toTitleCase(nameValue.trim());
    if (!name) return;
    let category = this.categoriesService.categories().find(c => c.name.toLowerCase() === name.toLowerCase());
    if (!category) category = await this.categoriesService.create(name);
    this.tags.update(tags => {
      const id = category!.id.toString();
      return tags.includes(id) ? tags : [...tags, id];
    });
  }

  removeTag(tagToRemove: string) {
    this.tags.update(tags => tags.filter(tag => !areSameTag(tag, tagToRemove)));
  }

  onTagInput(input: HTMLInputElement) {
    const tag = input.value.trim();
    if (tag) { this.addTag(tag).then(); input.value = ''; }
  }
}
