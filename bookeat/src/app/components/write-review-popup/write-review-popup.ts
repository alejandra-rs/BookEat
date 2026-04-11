import { Component, inject, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StarSelector } from '../star-selector/star-selector';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InsertImage} from '../insert-image/insert-image';

@Component({
  selector: 'app-write-review-popup',
  imports: [StarSelector, ReactiveFormsModule, InsertImage],
  templateUrl: './write-review-popup.html',
  styleUrl: './write-review-popup.css',
  encapsulation: ViewEncapsulation.None,
})
export class WriteReviewPopup {
  activeModal = inject(NgbActiveModal);

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    pros: new FormControl('', [Validators.required]),
    cons: new FormControl('', [Validators.required]),
    rating: new FormControl(1, [Validators.required]),
  })

  submit() {
    if (this.form.valid) this.activeModal.close(this.form.value);
  }
}
