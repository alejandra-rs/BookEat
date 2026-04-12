import { Routes } from '@angular/router';
import {LandingPage} from './pages/landing-page/landing-page';
import {RestaurantInfoPage} from './pages/restaurant-info-page/restaurant-info-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPage
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: RestaurantInfoPage
  },
  {
    path: 'Become-an-affiliate',
    pathMatch: 'full',
    component: LandingPage
  }
];
