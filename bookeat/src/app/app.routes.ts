import { Routes } from '@angular/router';
import {LandingPage} from './pages/landing-page/landing-page';
import {RestaurantInfoPage} from './pages/restaurant-info-page/restaurant-info-page';
import {BookingDetailsPage} from './pages/booking-details-page/booking-details-page';

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
    path: ':id',
    pathMatch: 'full',
    component: RestaurantInfoPage
  }
];
