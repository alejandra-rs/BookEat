import {Component, inject} from '@angular/core';
import {RestaurantCarousel} from '../../components/restaurant-carousel/restaurant-carousel.component';
import {RestaurantsService} from '../../services/firebase/restaurants.service';

@Component({
  selector: 'app-landing-page',
  imports: [RestaurantCarousel],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {}
