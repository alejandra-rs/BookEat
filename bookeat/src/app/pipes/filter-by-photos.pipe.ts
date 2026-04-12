import { Pipe, PipeTransform } from '@angular/core';
import {ReviewWithUser} from '../models/review.model';

@Pipe({
  name: 'filterByPhotos',
})
export class FilterByPhotosPipe implements PipeTransform {
  transform(reviews: ReviewWithUser[], withPhotos: boolean): ReviewWithUser[] {
    return withPhotos ? reviews.filter(r => r.images.length > 0) : reviews;
  }
}
