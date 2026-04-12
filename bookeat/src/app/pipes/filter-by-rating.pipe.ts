import { Pipe, PipeTransform } from '@angular/core';
import {ReviewWithUser} from '../models/review.model';

@Pipe({
  name: 'filterByRating',
})
export class FilterByRatingPipe implements PipeTransform {
  transform(reviews: ReviewWithUser[], star: number | null): ReviewWithUser[] {
    if (star === null) return reviews;
    return reviews.filter(r => Number(r.rating) === star);
  }
}
