import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCard } from '../form-card/form-card';
import { form, FormField } from '@angular/forms/signals';
import { INITIAL_AFFILIATE_STATE, type AffiliateForm } from './affiliate.model';
import { AFFILIATE_TAG_SUGGESTIONS } from './affiliate-form.constants';
import { applyAffiliateFormValidators } from './affiliate-form.validators';
import { areSameTag, canonicalizeTag } from './affiliate-tag.utils';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-affiliate-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormCard, FormField, TitleCasePipe],
  templateUrl: './affiliate-form.html',
})
export class AffiliateFormComponent {
  affiliateModel = signal<AffiliateForm>(INITIAL_AFFILIATE_STATE);
  submitted = signal(false);
  availableTags = signal<string[]>(AFFILIATE_TAG_SUGGESTIONS);

  affiliateForm = form(this.affiliateModel, (path) => {
    applyAffiliateFormValidators(path);
  });

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
    if (this.affiliateForm().invalid()) {
      return;
    }
    console.log('Valores a enviar:', this.affiliateForm().value());
  }

  tags() {
    return this.affiliateModel().tags;
  }

  addTag(value: string) {
    const tag = canonicalizeTag(value, this.availableTags());

    if (!tag) return;

    this.affiliateModel.update((currentModel) => {
      const alreadyExists = currentModel.tags.some((currentTag) => areSameTag(currentTag, tag));

      if (alreadyExists) {
        return currentModel;
      }

      return {
        ...currentModel,

        tags: [...currentModel.tags, tag],
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
      this.addTag(tag);

      input.value = '';
    }
  }
}
