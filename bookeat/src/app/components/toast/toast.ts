import { Component, signal } from '@angular/core';

const message = signal('');
const visible = signal(false);
let hideTimer: ReturnType<typeof setTimeout> | null = null;
let clearTimer: ReturnType<typeof setTimeout> | null = null;

export function showToast(msg: string) {
  if (hideTimer) clearTimeout(hideTimer);
  if (clearTimer) clearTimeout(clearTimer);
  visible.set(false);
  message.set(msg);
  setTimeout(() => visible.set(true), 10);
  hideTimer = setTimeout(() => {
    visible.set(false);
    clearTimer = setTimeout(() => message.set(''), 300);
  }, 3000);
}

@Component({
  selector: 'app-toast',
  imports: [],
  template: `
    @if (message()) {
      <div class="toast" [class.show]="visible()">{{ message() }}</div>
    }
  `,
})
export class Toast {
  message = message;
  visible = visible;
}
