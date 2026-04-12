import {Component, computed, input, Input} from '@angular/core';
import {OpeningHours, Restaurant, TimeSlot} from '../../models/restaurant.model';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hour-table',
  imports: [],
  templateUrl: './hour-table.html',
  styleUrl: './hour-table.css',
})

export class HourTable {

  restaurant = input.required<Restaurant>()
  date = input(new Date().getDay(),{
    transform: (ngbDate: NgbDate | null) => {
      if (ngbDate) return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day).getDay()
      return new Date().getDay() ;
    }
  })

  ranges = computed(() =>{
  const currentRest = this.restaurant();
  const currentDate = this.date();
  const dayMap: Record<number, keyof OpeningHours> = { 0: "D", 1: "L", 2: "M", 3: "X", 4: "J", 5: "V", 6: "S" };
  let dayLetter = dayMap[currentDate];
  if ( !currentRest) return [];
    let ranges = currentRest.hours[dayLetter];
    if(!ranges) return [];
    const hours: string[] = [];
    let current, startH, startM
    let end, endH, endM

    for (let range of ranges){
      [startH, startM] = range.from.split(':');
      [endH, endM] = range.to.split(':')
      current = new Date();
      current.setHours(Number(startH), Number(startM), 0);
      end = new Date();
      end.setHours(Number(endH),Number(endM), 0)
      while (current <= end) {
        hours.push(`${current.toTimeString().substring(0, 5)}`);
        current.setMinutes(current.getMinutes() + 30);
      }
    }
    return hours;
  });
}
