import { Component, inject } from '@angular/core';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { RestaurantInfo } from '../../components/restaurant-info/restaurant-info';
import { RestaurantsService } from '../../services/jsonserver/restaurants.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReviewsService } from '../../services/jsonserver/reviews.service';
import { UserReview } from '../../components/user-review/user-review';
import { SortReviewsPipe } from '../../pipes/sort-reviews.pipe';
import {ReviewWithUser} from '../../models/review.model';

@Component({
  selector: 'app-restaurant-info-page',
  imports: [RestaurantInfo, AsyncPipe, UserReview, RouterLink, SortReviewsPipe, SlicePipe],
  templateUrl: './restaurant-info-page.html',
  styleUrl: './restaurant-info-page.css',
})
export class RestaurantInfoPage {
  private restaurantsService = inject(RestaurantsService);
  private reviewsService = inject(ReviewsService);
  private route = inject(ActivatedRoute);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly bestComparator = (a: ReviewWithUser, b: ReviewWithUser) => b.rating - a.rating;

  restaurant$ = this.restaurantsService.getById(this.id);
  reviews$ = this.reviewsService.getReviewsOf(this.id);
}
