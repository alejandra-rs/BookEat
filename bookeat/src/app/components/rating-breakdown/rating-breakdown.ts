import {Component, computed, input} from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { AverageRatingPipe } from '../../pipes/average-rating.pipe';
import {UserScore} from '../user-score/user-score';

@Component({
  selector: 'app-rating-breakdown',
  imports: [AverageRatingPipe, UserScore],
  templateUrl: './rating-breakdown.html',
  styleUrl: './rating-breakdown.css',
})
export class RatingBreakdown {
  restaurant = input<Restaurant>();

  total = computed(() => {
    const r = this.restaurant()?.rating;
    if (!r) return 0;
    return Object.values(r).reduce((sum, count) => sum + count, 0);
  });

  percent(stars: string): number {
    const total = this.total();
    if (total === 0) return 0;
    return (((this.restaurant()?.rating)?.[stars] ?? 0) / total) * 100;
  }
}
