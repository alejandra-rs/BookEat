import {afterNextRender, computed, inject, Injectable, signal} from '@angular/core';
import {addDoc, collection, doc, Firestore, getDoc, getDocs, query, where} from '@angular/fire/firestore';
import {SessionUser} from '../../models/users.model';
import {catchError, firstValueFrom, forkJoin, from, map, Observable, throwError} from 'rxjs';
import {AuthUser, RestaurantProfile, UserProfile} from '../../models/auth.model';
import {loginForm} from '../../models/login.model';
import {AffiliateForm} from '../../models/affiliate.model';
import {Restaurant} from '../../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firestore = inject(Firestore);
  private _currentUser = signal<SessionUser | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._currentUser());

  constructor() {
    afterNextRender(() => this.loadSession());
  }

  private loadSession() {
    try {
      const saved = sessionStorage.getItem('currentSession');
      if (saved) this._currentUser.set(JSON.parse(saved) as SessionUser);
    } catch {
      sessionStorage.removeItem('currentSession');
    }
  }

  async login({ email, password }: loginForm): Promise<void> {
    const user = await firstValueFrom(this.getByEmail(email));
    if (!user || user.password !== password) throw new Error('Invalid email or password');
    this.saveSession(user);
  }

  logout(){
    this._currentUser.set(null);
    sessionStorage.removeItem('currentSession');
  }

  getByEmail(email: string): Observable<AuthUser | null> {
    const userRef = collection(this.firestore, 'users');
    const profileRef = collection(this.firestore, "restaurantProfiles")

    const userQuery = query(userRef, where('email', '==', email));
    const profileQuery = query(profileRef, where('email', '==', email));

    return forkJoin({
      users: from(getDocs(userQuery)).pipe(map(snap => snap.docs.map(d => ({ id: d.id, ...d.data() } as UserProfile)))),
      restaurants: from(getDocs(profileQuery)).pipe(map(snap => snap.docs.map(d => ({ id: d.id, ...d.data() } as RestaurantProfile)))),
    }).pipe(
      map(({ users, restaurants }) => {
        if (users[0]) return { ...users[0], role: 'USER' as const };
        if (restaurants[0]) return { ...restaurants[0], role: 'RESTAURANT' as const };
        return null;
      }),
      catchError(() => throwError(() => new Error('Error fetching user from Firestore')))
    );
  }

  getRestaurantById(id:string): Observable<AuthUser | null>{
    const docRef = doc(this.firestore, `restaurantProfiles/${id}`);
    return from(getDoc(docRef)).pipe(
      map(docSnap => docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as AuthUser : null)
    );
  }

  getUserById(id: string): Observable<AuthUser | null> {
    const docRef = doc(this.firestore, `users/${id}`);
    return from(getDoc(docRef)).pipe(
      map(docSnap => docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as AuthUser : null)
    );
  }

  async postRestaurantProfile(data: AffiliateForm): Promise<void> {
    const existingUser = await firstValueFrom(this.getByEmail(data.email));
    if (existingUser) throw new Error('This user already exists.');

    const restaurantRef = await addDoc(
      collection(this.firestore, 'restaurants'),
      this.buildRestaurantPayload(data)
    );

    const profilePayload = this.buildRestaurantProfilePayload(data, restaurantRef.id);
    const profileRef = await addDoc(
      collection(this.firestore, 'restaurantProfiles'),
      profilePayload
    );

    this.saveSession({
      id: profileRef.id,
      role: 'RESTAURANT',
      image: ''
    } as AuthUser);
  }

  private saveSession(user: AuthUser) {
      const session: SessionUser = { id: user.id, role: user.role, image: user.image };
      this._currentUser.set(session);
      if (typeof window !== 'undefined') sessionStorage.setItem("currentSession", JSON.stringify(session));
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

  private buildAddress(data: AffiliateForm) {
    return [data.addressLine1, data.addressLine2, data.city, data.province, data.postalCode]
      .filter((part) => !!part)
      .join(', ');
  }

  updateImage(url: string) {
    const current = this._currentUser();
    if (current) this._currentUser.set({ ...current, image: url });
  }
}
