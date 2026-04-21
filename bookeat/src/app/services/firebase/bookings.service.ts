import {inject, Injectable} from '@angular/core';
import {Booking, BookingExpanded} from '../../models/booking.model';
import {parse} from 'date-fns';
import {User} from '../../models/users.model';
import {UsersService} from './users.service';
import {RestaurantsService} from './restaurants.service';
import {Restaurant} from '../../models/restaurant.model';
import { map, Observable, switchMap, forkJoin, of } from 'rxjs';
import {AuthService} from '../jsonserver/auth.service';
import firebase from 'firebase/compat/app';
import firestore = firebase.firestore;
import {collection, collectionData, query, where} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private firestore= inject(firestore);
  private authService= inject(AuthService);
  private BASE_URL = 'http://localhost:3000/';
  private userService= inject(UsersService);
  private restaurantsService= inject(RestaurantsService);
  private user = this.authService.currentUser;

   toDate(date: string): Date {
    return parse(date, 'dd-MM-yyyy HH:mm:ss', new Date());
  }
  getRestUser(){
    return `${(this.getRole())}Id=${this.user()?.id}`;
  }

  private getRole() {
    return this.user()?.role.toLowerCase();
  }
  getReservation(time: string) {
     const ref = collection(this.firestore, 'bookings');
     const q = query(ref, where('status', '==',  time))
    return (collectionData(q, {idField: 'id'}) as Observable<Booking[]>).pipe(
      switchMap((bookings ) => {
        if(bookings.length === 0) return of([])
        const expandedBookings$ = bookings.map(booking => this.expandBooking(booking))
        return forkJoin(expandedBookings$);
      })

    )
   }


  private expandBooking(booking: Booking) {
    return this.getRole() === 'user' ?
      this.restaurantsService.getById(booking.restaurantId).pipe(
        map((restaurant: Restaurant) => this.expand(booking, restaurant))
      ):
      this.userService.getById(booking.userId, this.user()?.role ?? "USER").pipe(
        map((user: User) => this.expand(booking, user))
      );
    }

  private expand(booking: Booking, item: Restaurant|User ) {
    return {
      ...booking,
      expand: item
    } as BookingExpanded;
  }

  getByRestaurantAndDatetime(restaurantId: string, datetime: string): Observable<Booking[]> {
     const ref = collection(this.firestore, 'bookings');
     const q = query(ref, where('status', '==',  datetime))
    return (collectionData(q, {idField: 'id'}) as Observable<Booking[]>)
  }

  getBetween(start: Date, end?: Date): Observable<Booking[]> {
    const ref = collection(this.firestore, 'bookings');

    let q = query(
      ref,
      ...(end
          ? [where('datetime', '>=', start), where('datetime', '<=', end)]
          : [where('datetime', '==', start)]
      )
    )

    return collectionData(q, {idField: 'id'}) as Observable<Booking[]>;
  }


}
