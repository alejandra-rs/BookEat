import {Component, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {RatingBreakdown} from '../../components/rating-breakdown/rating-breakdown';
import {RestaurantsService} from '../../services/firebase/restaurants.service';
import {ReviewsService} from '../../services/firebase/reviews.service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {RestaurantInfo} from '../../components/restaurant-info/restaurant-info';
import {UserReview} from '../../components/user-review/user-review';
import {ReviewWithUser} from '../../models/review.model';
import {SortReviewsPipe} from '../../pipes/sort-reviews.pipe';
import {FilterByRatingPipe} from '../../pipes/filter-by-rating.pipe';
import {FilterByPhotosPipe} from '../../pipes/filter-by-photos.pipe';

type SortOption = 'newest' | 'oldest' | 'best' | 'worst';
type ReviewComparator = (a: ReviewWithUser, b: ReviewWithUser) => number;

@Component({
  selector: 'app-restaurant-reviews-page',
  imports: [RatingBreakdown, AsyncPipe, RestaurantInfo, UserReview, SortReviewsPipe, FilterByRatingPipe, FilterByPhotosPipe],
  templateUrl: './restaurant-reviews-page.html',
  styleUrl: './restaurant-reviews-page.css',
})
export class RestaurantReviewsPage {
  private restaurantsService = inject(RestaurantsService);
  private reviewsService = inject(ReviewsService);
  private route = inject(ActivatedRoute);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly restaurant$ = this.restaurantsService.getById(this.id!);
  readonly reviews = toSignal(this.reviewsService.getReviewsOf(this.id!), { initialValue: [] });

  ratingFilter = signal<number | null>(null);
  onlyPicturesFilter = signal<boolean>(false);
  sorting = signal<SortOption>('newest');

  readonly sortComparators: Record<SortOption, ReviewComparator> = {
    newest: (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
    oldest: (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
    best:   (a, b) => b.rating - a.rating,
    worst:  (a, b) => a.rating - b.rating,
  };

  togglePhotos() { this.onlyPicturesFilter.update(v => !v); }

  setSorting(event: Event) {
    this.sorting.set((event.target as HTMLSelectElement).value as SortOption);
  }
}
