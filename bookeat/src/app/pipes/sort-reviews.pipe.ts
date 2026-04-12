import { Pipe, PipeTransform } from '@angular/core';
import { ReviewWithUser } from '../models/review.model';

@Pipe({
  name: 'sortReviews',
  pure: true,
})
export class SortReviewsPipe implements PipeTransform {
  transform(reviews: ReviewWithUser[], order: (a: ReviewWithUser, b: ReviewWithUser) => number): ReviewWithUser[] {
    return [...reviews].sort(order);
  }
}
