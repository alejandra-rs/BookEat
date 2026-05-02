import {Component, input, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-price-label',
  imports: [],
  templateUrl: './price-label.component.html',
  styleUrl: './price-label.component.css',
})
export class PriceLabel {
  minPrice = input<number>(0);
  maxPrice = input<number>(0);
}
