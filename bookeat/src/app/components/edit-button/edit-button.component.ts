import {Component, input, output} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-edit-button',
  imports: [],
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.css',
})
export class EditButton {
  editing = input<boolean>(false);
  clicked = output<void>();
}
