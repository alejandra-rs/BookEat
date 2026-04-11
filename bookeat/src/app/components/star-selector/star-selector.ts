import { Component, model } from '@angular/core';

@Component({
  selector: 'app-star-selector',
  imports: [],
  templateUrl: './star-selector.html',
  styleUrl: './star-selector.css',
})
export class StarSelector {
  rating = model<number>(0);

  readonly stars= [1, 2, 3, 4, 5];

  select(value: number) {
    this.rating.set(value);
  }
}
