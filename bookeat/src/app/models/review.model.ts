import {User} from './users.model';

export interface Review {
  id: number;
  title: string;
  description: string;
  rating: number;
  pros: string;
  cons: string;
  userId: string;
  restaurantId: string;
  datetime: string;
  images: string[];
}

export interface ReviewWithUser extends Review {
  user: User | null;
}
