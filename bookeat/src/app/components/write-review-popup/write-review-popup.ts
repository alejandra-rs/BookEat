import {Component, inject, input, output, signal} from '@angular/core';
import {StarSelector} from '../star-selector/star-selector';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InsertImage} from '../insert-image/insert-image';
import {Restaurant} from '../../models/restaurant.model';
import {ReviewsService} from '../../services/firebase/reviews.service';
import {AuthService} from '../../services/firebase/auth.service';
import {CloudinaryService} from '../../services/cloudinary.service';

@Component({
  standalone: true,
  selector: 'app-write-review-popup',
  imports: [StarSelector, ReactiveFormsModule, InsertImage],
  templateUrl: './write-review-popup.html',
  styleUrl: './write-review-popup.css',
})
export class WriteReviewPopup {
  private reviewsService = inject(ReviewsService);
  private auth = inject(AuthService);
  private cloudinary = inject(CloudinaryService);

  restaurant = input.required<Restaurant>();
  open = input(false);
  closed = output<void>();

  pendingFiles = signal<File[]>([]);
  submitting = signal(false);
  submitted = signal(false);
  uploadError = signal<string | null>(null);

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    pros: new FormControl('', [Validators.required]),
    cons: new FormControl('', [Validators.required]),
    rating: new FormControl(1, [Validators.required]),
  });

  close() { this.closed.emit(); }

  async submit() {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (!this.form.valid || this.submitting()) return;
    const userId = this.auth.currentUser()?.id;
    if (!userId) return;

    this.submitting.set(true);
    this.uploadError.set(null);
    try {
      const imageUrls = await Promise.all(
        this.pendingFiles().map(file => this.cloudinary.upload(file))
      );
      await this.reviewsService.create({
        ...this.form.value as any,
        userId,
        restaurantId: this.restaurant().id,
        datetime: new Date().toISOString(),
        images: imageUrls,
      });
      this.form.reset({ rating: 1 });
      this.pendingFiles.set([]);
      this.close();
    } catch (e: any) {
      this.uploadError.set(e?.message ?? 'Upload failed. Check Firebase Storage permissions.');
    } finally {
      this.submitting.set(false);
    }
  }
}
