import {computed, inject, Injectable, signal} from '@angular/core';
import {
  Auth, authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User
} from '@angular/fire/auth';
import {
  collection, doc, Firestore,
  setDoc, addDoc, getDoc
} from '@angular/fire/firestore';
import {toSignal} from '@angular/core/rxjs-interop';
import {from, of, switchMap} from 'rxjs';
import {SessionUser} from '../../models/users.model';
import {loginForm} from '../../models/login.model';
import {AffiliateForm} from '../../models/affiliate.model';
import {Restaurant} from '../../models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  private _imageOverride = signal<string | null>(null);

  private session = toSignal(
    authState(this.auth).pipe(
      switchMap(user => user ? from(this.resolveSession(user)) : of(null))
    ),
    { initialValue: null }
  );

  readonly currentUser = computed(() => {
    const session = this.session();
    if (!session) return null;
    const override = this._imageOverride();
    return override !== null ? { ...session, image: override } : session;
  });

  readonly isAuthenticated = computed(() => !!this.currentUser());

  async login({ email, password }: loginForm): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle(): Promise<void> {
    const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
    const user = result.user;
    const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(this.firestore, 'users', user.uid), {
        name: user.displayName?.split(' ')[0] ?? '',
        surname: user.displayName?.split(' ').slice(1).join(' ') ?? '',
        accountName: user.displayName ?? '',
        email: user.email ?? '',
        phoneNumber: '',
        birthdate: '',
        image: user.photoURL || '',
        role: 'USER',
      });
    }
  }

  async register(data: {
    name: string; surname: string; email: string;
    password: string; phoneNumber: string; birthdate: string;
  }): Promise<void> {
    const cred = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
    await setDoc(doc(this.firestore, 'users', cred.user.uid), {
      name: data.name,
      surname: data.surname,
      accountName: `${data.name} ${data.surname}`,
      email: data.email,
      phoneNumber: `+34 ${data.phoneNumber}`,
      birthdate: data.birthdate,
      image: '',
      role: 'USER',
    });
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  updateImage(url: string) {
    this._imageOverride.set(url);
  }

  getRestaurantById(id: string) {
    return from(getDoc(doc(this.firestore, `restaurantProfiles/${id}`))).pipe(
      switchMap(snap => of(snap.exists() ? { id: snap.id, ...snap.data() } : null))
    );
  }

  async postRestaurantProfile(data: AffiliateForm): Promise<void> {
    const cred = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
    const restaurantRef = await addDoc(collection(this.firestore, 'restaurants'), this.buildRestaurantPayload(data));
    await setDoc(doc(this.firestore, 'restaurantProfiles', cred.user.uid), {
      name: data.name,
      surname: data.surname,
      accountName: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      image: '',
      role: 'RESTAURANT',
      restaurantId: restaurantRef.id,
    });
  }

  private async resolveSession(user: User): Promise<SessionUser | null> {
    // Look up by UID first (new users registered after Firebase Auth migration)
    const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
    if (userDoc.exists()) return { id: user.uid, role: 'USER', image: userDoc.data()['image'] ?? '' };

    const restDoc = await getDoc(doc(this.firestore, 'restaurantProfiles', user.uid));
    if (restDoc.exists()) return {
      id: user.uid, role: 'RESTAURANT',
      image: restDoc.data()['image'] ?? '',
      restaurantId: restDoc.data()['restaurantId'] ?? ''
    };

    return null;
  }

  private buildRestaurantPayload(data: AffiliateForm): Omit<Restaurant, 'id'> {
    return {
      name: data.restaurantName,
      description: '',
      hours: { L: [], M: [], X: [], J: [], V: [], S: [], D: [] },
      url: '',
      address: [data.addressLine1, data.addressLine2, data.city, data.province, data.postalCode]
        .filter(Boolean).join(', '),
      minPrice: 0, maxPrice: 0,
      coordinates: [0, 0],
      categories: [],
      rating: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
      menu: [],
      tableMap: { outline: [], tables: [] },
      image: '',
      gallery: [],
    };
  }
}
