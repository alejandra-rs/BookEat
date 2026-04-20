import {Component, inject, signal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormCard} from '../form-card/form-card';
import {form, FormField} from '@angular/forms/signals';
import {INITIAL_AFFILIATE_STATE, type AffiliateForm} from '../../models/affiliate.model';
import {applyAffiliateFormValidators} from '../../validators/affiliate-form.validators';
import {areSameTag,  toTitleCase} from '../../pipes/canonicalize-tag.pipe';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../services/jsonserver/auth.service';
import {Router} from '@angular/router';
import {CategoriesService} from '../../services/firebase/categories.service';

@Component({
  selector: 'app-affiliate-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormCard, FormField, TitleCasePipe],
  templateUrl: './affiliate-form.html',
})
export class AffiliateFormComponent {
  private authService = inject(AuthService);
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  affiliateModel = signal<AffiliateForm>(INITIAL_AFFILIATE_STATE);
  availableTags = this.categoriesService.categories;
  submitted = signal(false);
  error = signal<string | null>(null);

  affiliateForm = form(this.affiliateModel, (path) => {
    applyAffiliateFormValidators(path);
  });

  async onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
    if (this.affiliateForm().invalid()) return;
    this.error.set(null);
    try {
      await this.authService.postRestaurantProfile(this.affiliateForm().value() as AffiliateForm);
      this.affiliateModel.set(INITIAL_AFFILIATE_STATE);
      this.submitted.set(false);
      await this.router.navigate(['/']);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  }

  tags() { return this.affiliateModel().tags; }

  getTagName(id: string): string {
    const category = this.categoriesService.categories().find(c => c.id.toString() === id);
    return category ? category.name : 'Loading...';
  }

  async addTag(nameValue: string) {
    const name = toTitleCase(nameValue.trim());
    if (!name) return;

    let category = this.categoriesService.categories().find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );

    if (!category) {
      category = await this.categoriesService.create(name);
    }

    this.affiliateModel.update(state => {
      const categoryIdStr = category!.id.toString();
      if (state.tags.includes(categoryIdStr)) {
        return state;
      }
      return {
        ...state,
        tags: [...state.tags, categoryIdStr]
      };
    });
  }
  removeTag(tagToRemove: string) {
    this.affiliateModel.update((currentModel) => ({
      ...currentModel,
      tags: currentModel.tags.filter((tag) => !areSameTag(tag, tagToRemove)),
    }));
  }

  onTagInput(input: HTMLInputElement) {
    const tag = input.value.trim();
    if (tag) {
      this.addTag(tag).then();
      input.value = '';
    }
  }
}
