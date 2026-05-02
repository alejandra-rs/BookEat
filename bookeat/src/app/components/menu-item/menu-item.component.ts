import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItem {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() description: string = '';
  @Input() image: string = '';
}
