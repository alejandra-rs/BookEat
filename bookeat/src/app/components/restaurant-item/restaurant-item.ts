import { Component, input } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { UserScore } from '../user-score/user-score';
import { PriceLabel } from '../price-label/price-label';
import { RouterLink } from '@angular/router';
import { AverageRatingPipe } from '../../pipes/average-rating.pipe';

@Component({
  standalone: true,
  selector: 'app-restaurant-item',
  imports: [UserScore, PriceLabel, RouterLink, AverageRatingPipe],
  templateUrl: './restaurant-item.html',
  styleUrl: './restaurant-item.css',
})
export class RestaurantItem {
  restaurant = input.required<Restaurant>();
}
