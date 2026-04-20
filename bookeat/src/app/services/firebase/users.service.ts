import {inject, Injectable} from '@angular/core';
import {RegisterForm, User} from '../../models/users.model';
import {UserRole} from '../../models/auth.model';
import {Firestore, collection, collectionData, doc, docData, updateDoc, addDoc} from '@angular/fire/firestore';
import {from, map, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(Firestore);

  getAll() {
    const ref = collection(this.firestore, 'users');
    return collectionData(ref, {idField: 'id'}) as Observable<User[]>;
  }

  getById(id: string, role: UserRole | string): Observable<User> {
    return docData(doc(this.firestore, role === 'USER' ? 'users' : 'restaurantProfiles', id),
                       {idField: 'id'}) as Observable<User>;
  }

  post(user: Omit<RegisterForm, 'confirmPassword'> & { image: string }) {
    const ref = collection(this.firestore, 'users');
    return addDoc(ref, user);
  }

  patch(id: string, role: UserRole, changes: Partial<User>) {
    const ref = doc(this.firestore, role === 'USER' ? 'users' : 'restaurant-profiles', id);
    return from(updateDoc(ref, changes)).pipe(
      map(() => ({ id, ...changes } as User))
    );
  }
}
