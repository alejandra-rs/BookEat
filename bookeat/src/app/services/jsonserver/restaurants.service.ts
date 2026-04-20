import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:3000';

  getAll(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.BASE_URL}/restaurants`);
  }

  getById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.BASE_URL}/restaurants/${id}`);
  }
}
