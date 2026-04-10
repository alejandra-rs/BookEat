import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-diners-selector',
  imports: [],
  templateUrl: './diners-selector.html',
  styleUrl: './diners-selector.css',
})
export class DinersSelector {
  diners = signal(1);

  increment() {
    this.diners.update(val => val + 1);
  }

  decrement() {
    this.diners.update(val => val > 1 ? val - 1 : 1);
  }
}
