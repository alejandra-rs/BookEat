import {Component, Input} from '@angular/core';
import {Restaurant} from '../../models/restaurant.model';
import {UserScore} from '../user-score/user-score';

@Component({
  selector: 'app-restaurant-item',
  imports: [
    UserScore
  ],
  templateUrl: './restaurant-item.html',
  styleUrl: './restaurant-item.css',
})
export class RestaurantItem {
  @Input({ required : true }) restaurant!: Restaurant;
}
