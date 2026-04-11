import {Component, Input} from '@angular/core';
import {Restaurant} from '../../models/restaurant.model';
import {RestaurantItem} from '../restaurant-item/restaurant-item';

@Component({
  selector: 'app-restaurant-carousel',
  imports: [
    RestaurantItem
  ],
  templateUrl: './restaurant-carousel.html',
  styleUrl: './restaurant-carousel.css',
})
export class RestaurantCarousel {
  @Input({required:true}) restaurants!: Restaurant[];
  @Input({required: true}) title!: string;
}
