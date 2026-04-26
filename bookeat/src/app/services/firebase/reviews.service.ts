import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { UsersService } from './users.service';
import { Review, ReviewWithUser } from '../../models/review.model';
import { addDoc, collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private firestore = inject(Firestore);
  private usersService = inject(UsersService);

  getReviewsOf(restaurantId: string): Observable<ReviewWithUser[]> {
    const ref = query(
      collection(this.firestore, 'reviews'),
      where('restaurantId', '==', restaurantId)
    );
    return combineLatest({
      reviews: collectionData(ref, { idField: 'id' }) as unknown as Observable<Review[]>,
      users: this.usersService.getAll()
    }).pipe(
      map(({ reviews, users }) =>
        reviews.map(r => ({ ...r, user: users.find(u => u.id === r.userId) ?? null }))
      )
    );
  }

  async create(review: Omit<Review, 'id'>): Promise<void> {
    await addDoc(collection(this.firestore, 'reviews'), review);
  }
}
