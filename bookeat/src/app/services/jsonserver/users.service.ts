import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterForm, User} from '../../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private BASE_URL = 'http://localhost:3000';
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  post(user: Omit<RegisterForm, 'confirmPassword'> & { image: string }) {
    return this.http.post<User>(`${this.BASE_URL}/users`, user);
  }
}
