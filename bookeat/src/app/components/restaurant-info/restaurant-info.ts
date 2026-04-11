import { Component, Input } from '@angular/core';
import { RouterLink} from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import {UserScore} from '../user-score/user-score';


@Component({
  selector: 'app-restaurant-info',
  imports: [RouterLink, UserScore],
  templateUrl: './restaurant-info.html',
  styleUrl: './restaurant-info.css',
})
export class RestaurantInfo {
  @Input({required: true}) restaurant!: Restaurant;
}
