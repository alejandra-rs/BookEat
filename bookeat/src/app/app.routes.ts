import { Routes } from '@angular/router';
import {LandingPage} from './pages/landing-page/landing-page';
import {RestaurantInfoPage} from './pages/restaurant-info-page/restaurant-info-page';
import {BookingDetailsPage} from './pages/booking-details-page/booking-details-page';
import {RestaurantReviewsPage} from './pages/restaurant-reviews-page/restaurant-reviews-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPage
  },
  {
    path: 'booking-details/:id',
    pathMatch: 'full',
    component: BookingDetailsPage
  },
  {
    path: 'reviews/:id',
    pathMatch: 'full',
    component: RestaurantReviewsPage
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: RestaurantInfoPage
  }
];
