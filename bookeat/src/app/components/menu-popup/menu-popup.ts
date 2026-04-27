import {Component, input, output} from '@angular/core';
import {MenuSection as MenuSectionComponent} from '../menu-section/menu-section';
import {MenuSection} from '../../models/restaurant.model';

@Component({
  selector: 'app-menu-popup',
  imports: [MenuSectionComponent],
  templateUrl: './menu-popup.html',
  styleUrl: './menu-popup.css',
})
export class MenuPopup {
  sections = input<MenuSection[]>([]);
  open = input(false);
  closed = output<void>();

  close() { this.closed.emit(); }
}
