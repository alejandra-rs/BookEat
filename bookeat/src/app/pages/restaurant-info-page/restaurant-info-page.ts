import { Component, inject } from '@angular/core';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { RestaurantInfo } from '../../components/restaurant-info/restaurant-info';
import { RestaurantsService } from '../../services/jsonserver/restaurants.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReviewsService } from '../../services/jsonserver/reviews.service';
import { UserReview } from '../../components/user-review/user-review';
import { SortByRatingPipe } from '../../pipes/sort-by-rating.pipe';

@Component({
  selector: 'app-restaurant-info-page',
  imports: [RestaurantInfo, AsyncPipe, UserReview, RouterLink, SortByRatingPipe, SlicePipe],
  templateUrl: './restaurant-info-page.html',
  styleUrl: './restaurant-info-page.css',
})
export class RestaurantInfoPage {
  private restaurantsService = inject(RestaurantsService);
  private reviewsService = inject(ReviewsService);
  private route = inject(ActivatedRoute);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));

  restaurant$ = this.restaurantsService.getById(this.id);
  reviews$ = this.reviewsService.getReviewsOf(this.id);
}
