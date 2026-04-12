import { Pipe, PipeTransform } from '@angular/core';
import { Rating } from '../models/restaurant.model';

@Pipe({
  name: 'averageRating',
  pure: true,
})
export class AverageRatingPipe implements PipeTransform {
  transform(rating: Rating): number {
    const total = Object.values(rating).reduce((sum, count) => sum + count, 0);
    if (total === 0) return 0;
    const weightedSum = (Object.entries(rating) as [string, number][])
      .reduce((sum, [stars, count]) => sum + Number(stars) * count, 0);
    return Math.round((weightedSum / total) * 10) / 10;
  }
}
