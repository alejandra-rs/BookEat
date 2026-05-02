import {Component, effect, signal} from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  standalone: true,
  selector: 'app-diners-selector',
  imports: [],
  templateUrl: './diners-selector.component.html',
  styleUrl: './diners-selector.component.css',
})
export class DinersSelector {
  diners = signal(1);

  constructor(public sessionService: SessionService) {
    effect(() => {
      const stateDiners = this.sessionService.booking().diners;
      this.diners.set(Number(stateDiners) || 1);
    });
  }
  updateDinner(){
    this.sessionService.updateBooking({ diners: this.diners().toString() });
  }
  increment() {
    this.diners.update(val => val + 1);
    this.updateDinner()
  }

  decrement() {
    this.diners.update(val => val > 1 ? val - 1 : 1);
    this.updateDinner()
  }
}
