import {Component, Input} from '@angular/core';
import {Restaurant} from '../../models/restaurant.model';
import {UserScore} from '../user-score/user-score';
import {PriceLabel} from '../price-label/price-label';

@Component({
  selector: 'app-restaurant-item',
  imports: [
    UserScore,
    PriceLabel
  ],
  templateUrl: './restaurant-item.html',
  styleUrl: './restaurant-item.css',
})
export class RestaurantItem {
  @Input({ required : true }) restaurant!: Restaurant;
}
