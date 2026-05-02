import { Component, input } from '@angular/core';
import { Restaurant } from '../../models/restaurant.model';
import { UserScore } from '../user-score/user-score.component';
import { PriceLabel } from '../price-label/price-label.component';
import { RouterLink } from '@angular/router';
import { AverageRatingPipe } from '../../pipes/average-rating.pipe';

@Component({
  standalone: true,
  selector: 'app-restaurant-item',
  imports: [UserScore, PriceLabel, RouterLink, AverageRatingPipe],
  templateUrl: './restaurant-item.component.html',
  styleUrl: './restaurant-item.component.css',
})
export class RestaurantItem {
  restaurant = input.required<Restaurant>();
}
