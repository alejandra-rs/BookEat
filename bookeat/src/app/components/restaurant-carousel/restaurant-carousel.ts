import { Component, inject, input } from '@angular/core';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { RestaurantItem } from '../restaurant-item/restaurant-item';
import { RestaurantsService } from '../../services/firebase/restaurants.service';
import { ShufflePipe } from '../../pipes/shuffle.pipe';

@Component({
  selector: 'app-restaurant-carousel',
  imports: [RestaurantItem, AsyncPipe, ShufflePipe, SlicePipe],
  templateUrl: './restaurant-carousel.html',
  styleUrl: './restaurant-carousel.css',
})
export class RestaurantCarousel {
  private restaurantsService = inject(RestaurantsService);
  title = input.required<string>();

  restaurants$ = this.restaurantsService.getAll();
}
