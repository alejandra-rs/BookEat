import { Pipe, PipeTransform } from '@angular/core';
import { ReviewWithUser } from '../models/review.model';

@Pipe({
  name: 'sortByRating',
  pure: true,
})
export class SortByRatingPipe implements PipeTransform {
  transform(reviews: ReviewWithUser[], order: 'asc' | 'desc' = 'desc'): ReviewWithUser[] {
    return [...reviews].sort((a, b) =>
      order === 'desc' ? b.rating - a.rating : a.rating - b.rating
    );
  }
}
