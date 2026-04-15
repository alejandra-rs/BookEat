import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-card',
  standalone: true,
  template: `
    <div class="{{ classname }} " style="{{ styles }}">
      <h3 class="fw-bold mb-1 user-select-none">{{ title }}</h3>
      <p class="text-muted mb-3 user-select-none text-reset">{{ subtitle }}</p>
      <ng-content />
    </div>
  `,
})
export class FormCard {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() classname = '';
  @Input() styles = '';
}
