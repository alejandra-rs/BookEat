import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {RestaurantsService} from '../../services/firebase/restaurants.service';
import {CategoriesService} from '../../services/firebase/categories.service';
import {Overview} from '../../components/overview/overview';

@Component({
  selector: 'app-search-page',
  imports: [Overview, NgbDropdownModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  private restaurantsService = inject(RestaurantsService);
  private categoriesService = inject(CategoriesService);
  private route = inject(ActivatedRoute);

  readonly categories = this.categoriesService.categories;

  readonly searchQuery = toSignal(
    this.route.queryParamMap.pipe(map(p => p.get('q') ?? '')),
    { initialValue: '' }
  );

  minPrice = signal(0);
  maxPrice = signal(50);
  selectedCategories = signal<string[]>([]);

  private allRestaurants = toSignal(this.restaurantsService.getAll(), { initialValue: [] });

  readonly filtered = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const categories = this.selectedCategories();

    return this.allRestaurants().filter(r => {
      const matchesText = !q || r.name.toLowerCase().includes(q);
      const matchesPrice = (r.minPrice ?? 0) <= Math.max(this.minPrice(), this.maxPrice()) &&
                           (r.maxPrice ?? 0) >= Math.min(this.minPrice(), this.maxPrice());
      const matchesCategory = categories.length === 0 ||
                              categories.some(id => r.categories?.some(catId => String(catId) === String(id)));
      return matchesText && matchesPrice && matchesCategory;
    });
  });

  constructor() {
    this.categoriesService.load();
  }

  toggleCategory(id: string, checked: boolean) {
    this.selectedCategories.update(curr =>
      checked ? [...curr, id] : curr.filter(c => c !== id)
    );
  }

  isCategorySelected(id: string) {
    return this.selectedCategories().includes(id);
  }

  get categoryLabel(): string {
    const count = this.selectedCategories().length;
    return count === 0 ? 'All categories' : `${count} selected`;
  }
}
