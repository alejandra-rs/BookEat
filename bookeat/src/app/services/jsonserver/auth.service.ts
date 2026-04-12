import { afterNextRender, computed, inject, Injectable, signal } from '@angular/core';
import { AuthUser, RestaurantProfile, UserProfile } from '../../models/auth.model';
import { loginForm } from '../../models/login.model';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';

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

  getUserById(id: number): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.BASE_URL}/users/${id}`);
  }
  getRestaurantById(id: number): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.BASE_URL}/restaurant-profiles/${id}`);
  }
}
