import { Routes } from '@angular/router';
import {LandingPage} from './pages/landing-page/landing-page';
import {RestaurantInfoPage} from './pages/restaurant-info-page/restaurant-info-page';
import {BookingDetailsPage} from './pages/booking-details-page/booking-details-page';
import {RestaurantReviewsPage} from './pages/restaurant-reviews-page/restaurant-reviews-page';
import {AffiliateFormComponent} from './components/affiliate-form/affiliate-form.component';
import {CreateAnAccount} from './components/create-an-account/create-an-account.component';
import {EditProfilePage} from './pages/edit-profile-page/edit-profile-page';
import {BookTablePage} from './pages/book-table-page/book-table-page';
import {ReservationsPage} from './pages/reservations-page/reservations-page';
import {SearchPage} from './pages/search-page/search-page';

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
    path: 'book-table/:id',
    pathMatch: 'full',
    component: BookTablePage
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
    path: 'edit-profile',
    pathMatch: 'full',
    component: EditProfilePage
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: CreateAnAccount
  },
  {
    path: 'reservations-page',
    pathMatch: 'full',
    component: ReservationsPage,
  },
  {
    path: 'search',
    pathMatch: 'full',
    component: SearchPage,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: RestaurantInfoPage
  }
];
