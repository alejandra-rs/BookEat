import { Component, computed, inject, input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { Category } from '../../models/category.model';
import { UserScore } from '../user-score/user-score';
import { MenuPopup } from '../menu-popup/menu-popup';
import { computeAverageRating } from '../../utils/rating.utils';
import { CategoriesService } from '../../services/jsonserver/categories.service';

@Component({
  selector: 'app-restaurant-info',
  imports: [RouterLink, UserScore, MenuPopup],
  templateUrl: './restaurant-info.html',
  styleUrl: './restaurant-info.css',
})
export class RestaurantInfo {
  private categoriesService = inject(CategoriesService);
  @ViewChild(MenuPopup) menuPopup!: MenuPopup;

  restaurant = input.required<Restaurant>();
  protected readonly computeAverageRating = computeAverageRating;

  categories = computed<Category[]>(() =>
    this.categoriesService.resolve(this.restaurant().categories),
  );

  openMenu() {
    this.menuPopup.open();
  }
}
