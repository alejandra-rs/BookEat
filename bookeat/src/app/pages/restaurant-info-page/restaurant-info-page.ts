import { Component } from '@angular/core';
import { RestaurantInfo } from '../../components/restaurant-info/restaurant-info';
import { Restaurant } from '../../models/restaurant.model';
import {RestaurantItem} from '../../components/restaurant-item/restaurant-item';
import {RestaurantCarousel} from '../../components/restaurant-carousel/restaurant-carousel';

@Component({
  selector: 'app-restaurant-info-page',
  imports: [RestaurantInfo, RestaurantItem, RestaurantCarousel],
  templateUrl: './restaurant-info-page.html',
  styleUrl: './restaurant-info-page.css',
})

export class RestaurantInfoPage {
  restaurantesDestacados: Restaurant[] = [
    {
      id: 1,
      name: 'La Trattoria del Nonno',
      address: 'Calle Falsa 123, Madrid',
      description: 'La mejor pasta artesanal de la ciudad con recetas de la abuela.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
      rating: 4.8,
      price: 12,
      categories: [{ id: 1, name: 'Italiano' }, { id: 2, name: 'Romántico' }]
    },
    {
      id: 2,
      name: 'Sushi Master',
      address: 'Avenida del Mar 45, Barcelona',
      description: 'Pescado fresco del día y un ambiente moderno inigualable.',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
      rating: 4.5,
      price: 43,
      categories: [{ id: 3, name: 'Japonés' }]
    },
    {
      id: 3,
      name: 'La Trattoria del Nonno',
      address: 'Calle Falsa 123, Madrid',
      description: 'La mejor pasta artesanal de la ciudad con recetas de la abuela.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
      rating: 4.8,
      price: 12,
      categories: [{ id: 1, name: 'Italiano' }, { id: 2, name: 'Romántico' }]
    },
    {
      id: 4,
      name: 'Sushi Master',
      address: 'Avenida del Mar 45, Barcelona',
      description: 'Pescado fresco del día y un ambiente moderno inigualable.',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
      rating: 4.5,
      price: 43,
      categories: [{ id: 3, name: 'Japonés' }]
    },
    {
      id: 3,
      name: 'La Trattoria del Nonno',
      address: 'Calle Falsa 123, Madrid',
      description: 'La mejor pasta artesanal de la ciudad con recetas de la abuela.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
      rating: 4.8,
      price: 12,
      categories: [{ id: 1, name: 'Italiano' }, { id: 2, name: 'Romántico' }]
    },
    {
      id: 4,
      name: 'Sushi Master',
      address: 'Avenida del Mar 45, Barcelona',
      description: 'Pescado fresco del día y un ambiente moderno inigualable.',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
      rating: 4.5,
      price: 43,
      categories: [{ id: 3, name: 'Japonés' }]
    }
  ];
}
