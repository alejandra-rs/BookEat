import {Component, inject} from '@angular/core';
import { RestaurantInfo } from '../../components/restaurant-info/restaurant-info';
import { Restaurant } from '../../models/restaurant.model';
import {RestaurantItem} from '../../components/restaurant-item/restaurant-item';
import {RestaurantCarousel} from '../../components/restaurant-carousel/restaurant-carousel';
import {RestaurantsService} from '../../services/jsonserver/restaurants.service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-restaurant-info-page',
  imports: [RestaurantInfo, AsyncPipe],
  templateUrl: './restaurant-info-page.html',
  styleUrl: './restaurant-info-page.css',
})

export class RestaurantInfoPage {
  restaurantsService = inject(RestaurantsService);
  route = inject(ActivatedRoute);
  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  restaurant$ = this.restaurantsService.getById(this.id);
}
