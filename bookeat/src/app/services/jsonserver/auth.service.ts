import {afterNextRender, computed, inject, Injectable, signal} from '@angular/core';
import {AuthUser, RestaurantProfile, UserProfile} from '../../models/auth.model';
import {SessionUser} from '../../models/users.model';
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

  logout() {
    this._currentUser.set(null);
    sessionStorage.removeItem(SESSION_KEY);
  }

  getUserById(id: number): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.BASE_URL}/users/${id}`);
  }

  getRestaurantById(id: number): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.BASE_URL}/restaurant-profiles/${id}`);
  }
}
