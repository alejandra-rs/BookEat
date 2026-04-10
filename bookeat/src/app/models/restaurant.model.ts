import { Category } from './category.model';

export interface Restaurant {
  id: string | number;
  name: string;
  address: string;
  description: string;
  image?: string;
  rating?: number | string;
  categories?: Category[];
}
