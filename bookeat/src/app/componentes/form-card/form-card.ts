import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-card',
  standalone: true,
  template: `
    <div class="{{ classname }}" style="{{ styles }}">
      <h3 class="fw-bold mb-1">{{ title }}</h3>
      <p class="text-muted mb-3">{{ subtitle }}</p>
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

