import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RestaurantInfoPage} from './pages/restaurant-info-page/restaurant-info-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RestaurantInfoPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bookeat');
}
