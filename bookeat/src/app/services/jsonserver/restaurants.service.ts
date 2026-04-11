import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Restaurant} from '../../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:3000';

  getRandom(count: number): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.BASE_URL}/restaurants`)
      .pipe(
        map((restaurants: Restaurant[]) => {
          return [...restaurants].sort(() => Math.random() - 0.5).slice(0, count);
        })
      );
  }

  getById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.BASE_URL}/restaurants/${id}`);
  }
}
