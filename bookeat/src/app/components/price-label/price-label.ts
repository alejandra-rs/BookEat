import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-price-label',
  imports: [],
  templateUrl: './price-label.html',
  styleUrl: './price-label.css',
})
export class PriceLabel {
  @Input('price') price!: number;
}
