import { Component, inject, input } from '@angular/core';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { RestaurantItem } from '../restaurant-item/restaurant-item.component';
import { RestaurantsService } from '../../services/firebase/restaurants.service';
import { ShufflePipe } from '../../pipes/shuffle.pipe';

@Component({
  standalone: true,
  selector: 'app-restaurant-carousel',
  imports: [RestaurantItem, AsyncPipe, ShufflePipe, SlicePipe],
  templateUrl: './restaurant-carousel.component.html',
  styleUrl: './restaurant-carousel.component.css',
})
export class RestaurantCarousel {
  private restaurantsService = inject(RestaurantsService);
  title = input.required<string>();

  restaurants$ = this.restaurantsService.getAll();
}
