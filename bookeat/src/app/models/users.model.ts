import {UserProfile, UserRole} from './auth.model';

export interface SessionUser {
  id: string;
  role: UserRole;
  image: string;
  restaurantId?: string;
}

export type User = Omit<UserProfile, 'password' | 'role'>;

export interface RegisterForm extends Omit<UserProfile, 'id' | 'image' | 'role'> {
  confirmPassword: string;
}
