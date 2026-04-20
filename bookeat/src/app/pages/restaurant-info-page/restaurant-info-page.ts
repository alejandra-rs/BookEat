import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { RestaurantInfo } from '../../components/restaurant-info/restaurant-info';
import { RestaurantsService } from '../../services/jsonserver/restaurants.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReviewsService } from '../../services/jsonserver/reviews.service';
import { UserReview } from '../../components/user-review/user-review';
import { SortReviewsPipe } from '../../pipes/sort-reviews.pipe';
import { ReviewWithUser } from '../../models/review.model';
import { AuthService } from '../../services/jsonserver/auth.service';
import { RestaurantProfile } from '../../models/auth.model';
import { Restaurant } from '../../models/restaurant.model';
import { showToast } from '../../components/toast/toast';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-restaurant-info-page',
  imports: [RestaurantInfo, AsyncPipe, UserReview, RouterLink, SortReviewsPipe, SlicePipe],
  templateUrl: './restaurant-info-page.html',
  styleUrl: './restaurant-info-page.css',
})
export class RestaurantInfoPage {
  private restaurantsService = inject(RestaurantsService);
  private reviewsService = inject(ReviewsService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly bestComparator = (a: ReviewWithUser, b: ReviewWithUser) => b.rating - a.rating;

  restaurant = signal<Restaurant | null>(null);
  isEditMode = signal(false);
  reviews$ = this.reviewsService.getReviewsOf(this.id);

  constructor() {
    this.restaurantsService.getById(this.id).subscribe(r => this.restaurant.set(r));
    if (this.route.snapshot.queryParamMap.get('edit') === 'true') this.verifyEditAccess().then();
  }

  private async verifyEditAccess() {
    const user = this.authService.currentUser();
    if (!user || user.role !== 'RESTAURANT') return;

    try {
      const profile = await firstValueFrom(this.authService.getRestaurantById(Number(user.id))) as RestaurantProfile;
      if (String(profile.restaurantId) === String(this.id)) this.isEditMode.set(true);
    } catch {}
  }

  saveInfo(data: { name: string; description: string }) {
    this.restaurantsService.patch(this.id, data).subscribe(updated => {
      this.restaurant.set(updated);
      showToast('Restaurant info updated successfully.');
    });
  }
}
