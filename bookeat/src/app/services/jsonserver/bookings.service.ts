import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Booking, BookingExpanded} from '../../models/booking.model';
import {parse} from 'date-fns';
import {User} from '../../models/users.model';
import {UsersService} from './users.service';
import {RestaurantsService} from './restaurants.service';
import {Restaurant} from '../../models/restaurant.model';
import { map, Observable, switchMap, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private http= inject(HttpClient);
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

  getReservation(time: string): Observable<BookingExpanded[]> {
    return this.http.get<Booking[]>(`${this.BASE_URL}bookings?status=${time}&${this.getRestUser()}`).pipe(
      switchMap(bookings => {
        if (bookings.length === 0) return of([]);
        const expandedBookings$ = bookings.map(booking => this.expandBooking(booking))
        return forkJoin(expandedBookings$);
      })

    )
  }

  private expandBooking(booking: Booking) {
    if ( this.getRole() === 'user') {
      return this.restaurantsService.getById(booking.restaurantId).pipe(
        map((restaurant: Restaurant) => {
          return {
            ...booking,
            expand: restaurant
          } as BookingExpanded;
        })
      );
    } else {
      return this.userService.getById(String(booking.userId), this.user()?.role ?? "RESTAURANT").pipe(
        map((user: User) => {
          return {
            ...booking,
            expand: user
          } as BookingExpanded;
        })
      );
    }
  }


  getByRestaurantAndDatetime(restaurantId: number, datetime: string): Observable<Booking[]> {
    const encoded = encodeURIComponent(datetime);
    return this.http.get<Booking[]>(`${this.BASE_URL}/bookings?restaurantId=${restaurantId}&datetime=${encoded}`);
  }

  post(booking: Omit<Booking, 'id'>): Observable<Booking> {
    return this.http.post<Booking>(`${this.BASE_URL}/bookings`, booking);
  }

  getIncomingReservation() {
    return this.http.get<Booking[]>(`${this.BASE_URL}bookings?status=Incoming&${this.getRestUser()}`)
  }
  getBetween( start: Date, end: Date ) {
    return this.http.get<Booking[]>(`${this.BASE_URL}bookings?${this.getRestUser()}`).pipe(
      map(bookings => {
        bookings.filter( booking => {
          this.isBetween(this.toDate(booking.datetime), start, end);
        })
        })
    )
  }

  private isBetween(point: Date, start: Date, end: Date) {
    return point <= end && point >= start;
  }

}
