export type UserRole = 'USER' | 'RESTAURANT';

export interface BaseProfile {
  id: string;
  name: string;
  surname: string;
  accountName: string;
  email: string;
  phoneNumber: string;
  image: string;
  password: string;
  role: UserRole;
}

export interface UserProfile extends BaseProfile {
  role: 'USER';
  birthdate: string;
}

export interface RestaurantProfile extends BaseProfile {
  role: 'RESTAURANT';
  restaurantId: string;
}

export type AuthUser = UserProfile | RestaurantProfile;
