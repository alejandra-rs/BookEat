import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { RestaurantsService } from './restaurants.service';
import { Booking, BookingExpanded } from '../../models/booking.model';
import { Restaurant } from '../../models/restaurant.model';
import { User } from '../../models/users.model';

@Injectable({ providedIn: 'root' })
export class BookingsService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private usersService = inject(UsersService);
  private restaurantsService = inject(RestaurantsService);
  private user = this.authService.currentUser;

  private get role() {
    return this.user()?.role?.toLowerCase();
  }

  toDate(date: string): Date {
    return new Date(date);
  }

  getReservation(status: string): Observable<BookingExpanded[]> {
    const user = this.user();
    if (!user) return of([]);
    const normalizedStatus = status.includes('incoming') ? 'incoming' : status;

    const ref = collection(this.firestore, 'bookings');
    const filterField = user.role === 'USER' ? 'userId' : 'restaurantId';
    const filterValue = user.role === 'USER' ? user.id : String(user.restaurantId ?? user.id);
    const q = query(ref, where(filterField, '==', filterValue));

    return (collectionData(q, { idField: 'id' }) as Observable<Booking[]>).pipe(
      map((bookings) => bookings.filter((b) => b.status === normalizedStatus)),
      switchMap((bookings) => {
        if (!bookings.length) return of([]);
        return combineLatest(bookings.map((b) => this.expandBooking(b)));
      }),
    );
  }

  getByRestaurantAndDatetime(restaurantId: string, datetime: string): Observable<Booking[]> {
    const ref = collection(this.firestore, 'bookings');
    const q = query(
      ref,
      where('restaurantId', '==', restaurantId),
      where('datetime', '==', datetime),
    );
    return collectionData(q, { idField: 'id' }) as Observable<Booking[]>;
  }

  post(booking: Omit<Booking, 'id'>): Observable<Booking> {
    return new Observable((observer) => {
      addDoc(collection(this.firestore, 'bookings'), booking)
        .then((ref) => {
          observer.next({ ...booking, id: ref.id } as Booking);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  }

  private expandBooking(booking: Booking): Observable<BookingExpanded> {
    const expand = (item: Restaurant | User) => ({ ...booking, expand: item }) as BookingExpanded;
    return this.role === 'user'
      ? this.restaurantsService.getById(booking.restaurantId).pipe(map(expand))
      : this.usersService.getById(booking.userId, 'USER').pipe(map(expand));
  }
}
