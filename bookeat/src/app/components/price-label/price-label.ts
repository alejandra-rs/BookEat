import {Component, input, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-price-label',
  imports: [],
  templateUrl: './price-label.html',
  styleUrl: './price-label.css',
})
export class PriceLabel {
  minPrice = input<number>(0);
  maxPrice = input<number>(0);
}
