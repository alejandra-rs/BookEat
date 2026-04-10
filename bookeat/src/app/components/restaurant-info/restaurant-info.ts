import { Component, Input } from '@angular/core';
import { RouterLink} from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';


@Component({
  selector: 'app-restaurant-info',
  imports: [RouterLink],
  templateUrl: './restaurant-info.html',
  styleUrl: './restaurant-info.css',
})
export class RestaurantInfo {
  @Input({required: true}) restaurant!: Restaurant;
}
