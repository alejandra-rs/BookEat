import {Component, inject, Input} from '@angular/core';
import {Restaurant} from '../../models/restaurant.model';
import {RestaurantItem} from '../restaurant-item/restaurant-item';
import {RestaurantsService} from '../../services/jsonserver/restaurants.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-restaurant-carousel',
  imports: [
    RestaurantItem,
    AsyncPipe
  ],
  templateUrl: './restaurant-carousel.html',
  styleUrl: './restaurant-carousel.css',
})
export class RestaurantCarousel {
  restaurantsService = inject(RestaurantsService);
  @Input({required: true}) title!: string;

  restaurants$ = this.restaurantsService.getRandom(15);
}
