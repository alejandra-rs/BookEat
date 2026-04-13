import { afterNextRender, computed, inject, Injectable, signal } from '@angular/core';
import { AuthUser, RestaurantProfile, UserProfile } from '../../models/auth.model';
import { AffiliateForm } from '../../models/affiliate.model';
import { loginForm } from '../../models/login.model';
import { Restaurant } from '../../models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, forkJoin, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:3000';

  private _currentUser = signal<AuthUser>(null as any);
  public readonly currentUser = this._currentUser.asReadonly();
  public readonly isAuthenticated = computed(() => !!this._currentUser());
  constructor() {
    afterNextRender(() => this.loadSession());
  }

  getByEmail(email: string): Observable<AuthUser | null> {
    return forkJoin({
      users: this.http.get<AuthUser[]>(`${this.BASE_URL}/users`),
      restaurants: this.http.get<any[]>(`${this.BASE_URL}/restaurant-profiles`),
    }).pipe(
      map(({ users, restaurants }) => {
        const user = users.find((u) => u.email === email);
        if (user) return { ...user, role: 'USER' } as UserProfile;
        const restaurantProfile = restaurants.find((r) => r.email === email);
        if (restaurantProfile)
          return { ...restaurantProfile, role: 'RESTAURANT' } as RestaurantProfile;
        return null;
      }),
      catchError((err) => {
        console.log('conexion error', err);
        return throwError(() => new Error('An error occurred while trying to fetch user data'));
      }),
    );
  }

  async login({ email, password }: loginForm): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getByEmail(email).subscribe({
        next: (userFound) => {
          if (userFound && (userFound as any).password === password) {
            this.saveSession(userFound);
            resolve();
          } else {
            reject('invalid email or password');
          }
        },
        error: () => reject('An error occurred while trying to log in'),
      });
    });
  }

  private saveSession(user: AuthUser) {
    const session = {
      role: user.role,
      id: user.id,
      image: user.image,
    };
    this._currentUser.set(session as any);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('currentSession', JSON.stringify(session));
    }
  }

  private loadSession() {
    try {
      const savedSession = sessionStorage.getItem('currentSession');
      if (savedSession) {
        this._currentUser.set(JSON.parse(savedSession));
      }
    } catch (error) {
      console.error('Error parsing session', error);
      sessionStorage.removeItem('currentSession');
    }
  }

  logout() {
    this._currentUser.set(null as any);
    sessionStorage.removeItem('currentSession');
  }

  async postRestaurantProfile(data: AffiliateForm): Promise<void> {
    const existingUser = await firstValueFrom(this.getByEmail(data.email));
    if (existingUser) {
      throw new Error('This user already exists.');
    }

    const restaurantId = await this.getNextNumericId('restaurants');
    const restaurantPayload = this.buildRestaurantPayload(data, restaurantId);
    await firstValueFrom(this.http.post(`${this.BASE_URL}/restaurants`, restaurantPayload));

    const profileId = await this.getNextNumericId('restaurant-profiles');
    const profilePayload = this.buildRestaurantProfilePayload(data, profileId, restaurantId);
    await firstValueFrom(this.http.post(`${this.BASE_URL}/restaurant-profiles`, profilePayload));

    this.saveSession(profilePayload);
  }

  private async getNextNumericId(endpoint: 'restaurants' | 'restaurant-profiles'): Promise<number> {
    const items = await firstValueFrom(
      this.http.get<Array<{ id: number | string }>>(`${this.BASE_URL}/${endpoint}`),
    );

    const maxId = items.reduce((acc, item) => {
      const numericId = Number(item.id);
      return Number.isNaN(numericId) ? acc : Math.max(acc, numericId);
    }, 0);

    return maxId + 1;
  }

  private buildRestaurantPayload(data: AffiliateForm, restaurantId: number): Restaurant {
    return {
      id: restaurantId,
      name: data.restaurantName,
      description: '',
      hours: { L: [], M: [], X: [], J: [], V: [], S: [], D: [] },
      url: '',
      address: this.buildAddress(data),
      minPrice: 0,
      maxPrice: 0,
      coordinates: [0, 0],
      categories: [],
      rating: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
      menu: [],
      tableMap: { outline: [], tables: [] },
      image: '',
      gallery: [],
    };
  }

  private buildRestaurantProfilePayload(
    data: AffiliateForm,
    profileId: number,
    restaurantId: number,
  ): RestaurantProfile {
    return {
      id: String(profileId),
      name: data.name,
      surname: data.surname,
      accountName: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      image: '',
      password: data.password,
      role: 'RESTAURANT',
      restaurantId: String(restaurantId),
    };
  }

  private buildAddress(data: AffiliateForm): string {
    return [data.addressLine1, data.addressLine2, data.city, data.province, data.postalCode]
      .filter((part) => !!part)
      .join(', ');
  }

  getUserById(id: number): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.BASE_URL}/users/${id}`);
  }
  getRestaurantById(id: number): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.BASE_URL}/restaurant-profiles/${id}`);
  }
}
