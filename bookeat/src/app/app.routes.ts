import { Routes } from '@angular/router';
import {LandingPage} from './pages/landing-page/landing-page';
import {RestaurantInfoPage} from './pages/restaurant-info-page/restaurant-info-page';
import {BookingDetailsPage} from './pages/booking-details-page/booking-details-page';
import {RestaurantReviewsPage} from './pages/restaurant-reviews-page/restaurant-reviews-page';
import {AffiliateFormComponent} from './components/affiliate-form/affiliate-form';
import {CreateAnAccount} from './components/create-an-account/create-an-account';

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
    path: 'become-an-affiliate',
    pathMatch: 'full',
    component: AffiliateFormComponent
  },

  {
    path: 'register',
    pathMatch: 'full',
    component: CreateAnAccount
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: RestaurantInfoPage
  }
];
