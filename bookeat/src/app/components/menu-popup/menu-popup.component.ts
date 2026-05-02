import {Component, input, output} from '@angular/core';
import {MenuSection as MenuSectionComponent} from '../menu-section/menu-section.component';
import {MenuSection} from '../../models/restaurant.model';

@Component({
  standalone: true,
  selector: 'app-menu-popup',
  imports: [MenuSectionComponent],
  templateUrl: './menu-popup.component.html',
  styleUrl: './menu-popup.component.css',
})
export class MenuPopup {
  sections = input<MenuSection[]>([]);
  open = input(false);
  closed = output<void>();

  close() { this.closed.emit(); }
}
