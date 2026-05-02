import { Component, Input } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item.component';

export interface MenuSectionModel {
  name: string;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [MenuItem],
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.css',
})
export class MenuSection {
  @Input() sectionName: string = 'Menu section';
  @Input() items: MenuSectionModel[] = [];
}
