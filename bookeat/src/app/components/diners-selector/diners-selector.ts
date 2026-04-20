import {Component, effect, signal} from '@angular/core';
import {SessionService} from '../../services/jsonserver/session.service';

@Component({
  selector: 'app-diners-selector',
  imports: [],
  templateUrl: './diners-selector.html',
  styleUrl: './diners-selector.css',
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
