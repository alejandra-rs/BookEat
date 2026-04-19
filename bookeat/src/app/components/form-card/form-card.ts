import {Component, input} from '@angular/core';

@Component({
  selector: 'app-form-card',
  standalone: true,
  template: `
    <div class="{{ classname() }} " style="{{ styles() }}">
      <h3 class="fw-bold mb-1 user-select-none">{{ title() }}</h3>
      <p class="text-muted mb-3 user-select-none text-reset">{{ subtitle() }}</p>
      <ng-content />
    </div>
  `,
})
export class FormCard {
  title= input.required<string>()
  subtitle = input.required<string>()
  classname = input<string>('')
  styles = input<string>('');
}
