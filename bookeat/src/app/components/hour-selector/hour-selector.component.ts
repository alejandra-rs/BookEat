import {Component, effect, model, ModelSignal} from '@angular/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {SessionService} from '../../services/session.service';

@Component({
  standalone: true,
  selector: 'app-hour-selector',
  imports: [NgbDropdownModule],
  templateUrl: './hour-selector.component.html',
  styleUrl: './hour-selector.component.css',
})
export class HourSelector {
  selectedHour = model<string|null>(null);

  constructor(public sessionService: SessionService) {
    effect(() => {
      const stateHour = this.sessionService.booking().time;
      if (stateHour) {
        this.selectedHour.set(stateHour);
      }
    });
  }
  hours = [
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30",
    "22:00", "22:30", "23:00", "23:30"
  ];

  select(hour: string) {
    this.selectedHour.set(hour);
    this.sessionService.updateBooking({ time: `${hour}` });
  }
}
