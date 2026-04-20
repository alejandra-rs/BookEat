import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, map, Observable} from 'rxjs';
import {UsersService} from './users.service';
import {Review, ReviewWithUser} from '../../models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:3000';
  private usersService = inject(UsersService);

  getReviewsOf(restaurantId: string): Observable<ReviewWithUser[]> {
    return forkJoin({
      reviews: this.http.get<Review[]>(`${this.BASE_URL}/reviews?restaurantId=${restaurantId}`),
      users:   this.usersService.getAll()
    }).pipe(
      map(({ reviews, users }) =>
        reviews.map(r => ({...r, user: users.find(u => Number(u.id) === Number(r.userId)) ?? null}))
      )
    );
  }
}
