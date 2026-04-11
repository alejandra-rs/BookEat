import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css',
})
export class MenuItem {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() description: string = '';
  @Input() imageSrc: string = '';
}
