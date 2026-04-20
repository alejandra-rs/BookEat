import {Component, output, signal} from '@angular/core';

@Component({
  selector: 'app-insert-image',
  imports: [],
  templateUrl: './insert-image.html',
  styleUrl: './insert-image.css',
})
export class InsertImage {
  imageSelected = output<string>();
  previewUrl = signal<string>('');

  onFileChange(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    this.previewUrl.set(url);
    this.imageSelected.emit(url);
  }
}
