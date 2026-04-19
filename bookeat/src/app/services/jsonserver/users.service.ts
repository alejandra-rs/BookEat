import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterForm, User} from '../../models/users.model';
import {UserRole} from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private BASE_URL = 'http://localhost:3000';
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  getById(id: string, role: UserRole) {
    return role == "USER" ? this.http.get<User>(`${this.BASE_URL}/users/${id}`)
                          : this.http.get<User>(`${this.BASE_URL}/restaurant-profiles/${id}`);
  }

  post(user: Omit<RegisterForm, 'confirmPassword'> & { image: string }) {
    return this.http.post<User>(`${this.BASE_URL}/users`, user);
  }

  patch(id: string, role: UserRole, changes: Partial<User>) {
    const url = role === 'USER' ? `${this.BASE_URL}/users/${id}`
                                       : `${this.BASE_URL}/restaurant-profiles/${id}`;
    return this.http.patch<User>(url, changes);
  }
}
