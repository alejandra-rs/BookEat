import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {EditButton} from '../edit-button/edit-button';

@Component({
  selector: 'app-edit-property',
  imports: [
    EditButton
  ],
  templateUrl: './edit-property.html',
  styleUrl: './edit-property.css',
})
export class EditProperty {
  property: FormControl = new FormControl('', Validators.required);
}
