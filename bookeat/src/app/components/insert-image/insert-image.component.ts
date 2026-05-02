import {Component, output, signal} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-insert-image',
  imports: [],
  templateUrl: './insert-image.component.html',
  styleUrl: './insert-image.component.css',
})
export class InsertImage {
  filesChange = output<File[]>();

  items = signal<{ file: File; preview: string }[]>([]);

  onFileChange(input: HTMLInputElement) {
    const files = Array.from(input.files ?? []);
    if (!files.length) return;
    const newItems = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    this.items.update(curr => [...curr, ...newItems]);
    this.filesChange.emit(this.items().map(i => i.file));
    input.value = '';
  }

  remove(index: number) {
    URL.revokeObjectURL(this.items()[index].preview);
    this.items.update(curr => curr.filter((_, i) => i !== index));
    this.filesChange.emit(this.items().map(i => i.file));
  }
}
