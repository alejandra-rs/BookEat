import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { Category } from '../../models/category.model';
import { UserScore } from '../user-score/user-score';
import { computeAverageRating } from '../../utils/rating.utils';
import { CategoriesService } from '../../services/jsonserver/categories.service';

@Component({
  selector: 'app-restaurant-info',
  imports: [RouterLink, UserScore],
  templateUrl: './restaurant-info.html',
  styleUrl: './restaurant-info.css',
})
export class RestaurantInfo {
  private categoriesService = inject(CategoriesService);

  restaurant = input.required<Restaurant>();
  protected readonly computeAverageRating = computeAverageRating;

  categories = computed<Category[]>(() =>
    this.categoriesService.resolve(this.restaurant().categories)
  );
}
