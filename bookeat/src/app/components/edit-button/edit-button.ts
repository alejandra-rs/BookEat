import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-edit-button',
  imports: [],
  templateUrl: './edit-button.html',
  styleUrl: './edit-button.css',
})
export class EditButton {
  editing = input<boolean>(false);
  clicked = output<void>();
}
