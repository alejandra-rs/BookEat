import {afterNextRender, computed, inject, Injectable, signal} from '@angular/core';
import {AuthUser, RestaurantProfile, UserProfile} from '../../models/auth.model';
import {SessionUser} from '../../models/users.model';
import { AffiliateForm } from '../../models/affiliate.model';
import { Restaurant } from '../../models/restaurant.model';
import {loginForm} from '../../models/login.model';
import {HttpClient} from '@angular/common/http';
import {catchError, firstValueFrom, forkJoin, map, Observable, throwError} from 'rxjs';
const SESSION_KEY = 'currentSession';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:3000';

  private _currentUser = signal<SessionUser | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._currentUser());

  constructor() { afterNextRender(() => this.loadSession()); }

  getByEmail(email: string): Observable<AuthUser | null> {
    return forkJoin({
      users: this.http.get<UserProfile[]>(`${this.BASE_URL}/users?email=${email}`),
      restaurants: this.http.get<RestaurantProfile[]>(`${this.BASE_URL}/restaurant-profiles?email=${email}`),
    }).pipe(
      map(({ users, restaurants }) => {
        if (users[0]) return { ...users[0], role: 'USER' as const };
        if (restaurants[0]) return { ...restaurants[0], role: 'RESTAURANT' as const };
        return null;
      }),
      catchError(() => throwError(() => new Error('An error occurred while trying to fetch user data'))),
    );
  }

  async login({ email, password }: loginForm): Promise<void> {
    const user = await firstValueFrom(this.getByEmail(email));
    if (!user || user.password !== password) throw new Error('invalid email or password');
    this.saveSession(user);
  }

  private saveSession(user: AuthUser) {
    const session: SessionUser = { id: user.id, role: user.role, image: user.image };
    this._currentUser.set(session);
    if (typeof window !== 'undefined') sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  private loadSession() {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) this._currentUser.set(JSON.parse(saved) as SessionUser);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }

  updateImage(url: string) {
    const current = this._currentUser();
    if (current) this._currentUser.set({ ...current, image: url });
  }

  logout() {
    this._currentUser.set(null);
    sessionStorage.removeItem(SESSION_KEY);
  }

  async postRestaurantProfile(data: AffiliateForm): Promise<void> {
    const existingUser = await firstValueFrom(this.getByEmail(data.email));
    if (existingUser) {
      throw new Error('This user already exists.');
    }

    const restaurantPayload = this.buildRestaurantPayload(data);
    const newRestaurant = await firstValueFrom(this.http.post<Restaurant>(`${this.BASE_URL}/restaurants`, restaurantPayload));

    const profilePayload = this.buildRestaurantProfilePayload(data, newRestaurant.id);
    const newUser = await firstValueFrom(this.http.post<RestaurantProfile>(`${this.BASE_URL}/restaurant-profiles`, profilePayload));

    this.saveSession(newUser as AuthUser);
  }

  private buildRestaurantPayload(data: AffiliateForm): Omit<Restaurant, "id"> {
    return {
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
    restaurantId: string,
  ): Omit<RestaurantProfile, "id"> {
    return {
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

  getUserById(id: string): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.BASE_URL}/users/${id}`);
  }

  getRestaurantById(id: string): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.BASE_URL}/restaurant-profiles/${id}`);
  }
}
