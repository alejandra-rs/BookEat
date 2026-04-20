import {Restaurant} from './restaurant.model';
import {User} from './users.model';

export interface Booking{
  date: Date;
  id: string,
  restaurantId: string,
  userId: string,
  tables: number[]
  datetime: string,
  guests: number,
  status: Status,
}

export interface BookingExpanded{
  date: Date;
  id: string,
  restaurantId: string,
  userId: string,
  tables: number[]
  datetime: string,
  guests: number,
  status: Status,
  expand: Restaurant | User
}



export type Status = "incoming" | "past";
