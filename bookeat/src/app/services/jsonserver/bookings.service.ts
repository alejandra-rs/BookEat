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
    const encoded = encodeURIComponent(datetime);
    return this.http.get<Booking[]>(`${this.BASE_URL}/bookings?restaurantId=${restaurantId}&datetime=${encoded}`);
  }

  post(booking: Omit<Booking, 'id'>): Observable<Booking> {
    return this.http.post<Booking>(`${this.BASE_URL}/bookings`, booking);
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
