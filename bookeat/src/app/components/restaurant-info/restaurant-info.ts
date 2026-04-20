import { Component, computed, effect, inject, input, output, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { Category } from '../../models/category.model';
import { UserScore } from '../user-score/user-score';
import { MenuPopup } from '../menu-popup/menu-popup';
import { AverageRatingPipe } from '../../pipes/average-rating.pipe';
import { CategoriesService } from '../../services/firebase/categories.service';

@Component({
  selector: 'app-restaurant-info',
  imports: [RouterLink, UserScore, MenuPopup, AverageRatingPipe],
  templateUrl: './restaurant-info.html',
  styleUrl: './restaurant-info.css',
})
export class RestaurantInfo {
  private categoriesService = inject(CategoriesService);
  @ViewChild(MenuPopup) menuPopup!: MenuPopup;

  restaurant = input.required<Restaurant>();
  editMode = input<boolean>(false);
  infoSaved = output<{ name: string; description: string }>();

  categories = computed<Category[]>(() =>
    this.categoriesService.resolve(this.restaurant().categories)
  );

  editName = signal<string | null>(null);
  editDescription = signal<string | null>(null);

  constructor() {
    this.categoriesService.load();
    effect(() => {
      if (!this.editMode()) {
        this.editName.set(null);
        this.editDescription.set(null);
      }
    });
  }

  openMenu() {
    this.menuPopup.open();
  }

  emitSave() {
    this.infoSaved.emit({
      name: this.editName() ?? this.restaurant().name,
      description: this.editDescription() ?? this.restaurant().description,
    });
  }
}
