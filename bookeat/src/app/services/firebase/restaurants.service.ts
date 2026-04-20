import { inject, Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';
import { Firestore, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private firestore = inject(Firestore);

  getAll(): Observable<Restaurant[]> {
    const ref = collection(this.firestore, 'restaurants');
    return collectionData(ref, { idField: 'id' }) as Observable<Restaurant[]>;
  }

  getById(id: string): Observable<Restaurant> {
    const ref = doc(this.firestore, 'restaurants', id);
    return docData(ref, { idField: 'id' }) as Observable<Restaurant>;
  }

  patch(id: string, changes: Partial<Pick<Restaurant, 'name' | 'description'>>): Observable<Restaurant> {
    const ref = doc(this.firestore, 'restaurants', id);
    return from(updateDoc(ref, changes)).pipe(
      map(() => ({ id, ...changes } as Restaurant))
    );
  }
}
