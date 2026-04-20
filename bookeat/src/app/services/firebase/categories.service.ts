import { inject, Injectable, signal } from '@angular/core';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private firestore = inject(Firestore);

  private _categories = signal<Category[]>([]);
  readonly categories = this._categories.asReadonly();

  load(): void {
    if (this._categories().length > 0) return;
    const ref = collection(this.firestore, 'categories');
    (collectionData(ref, { idField: 'id' }) as Observable<Category[]>).subscribe(data => {
      this._categories.set(data);
    });
  }

  resolve(ids: (string | number)[]): Category[] {
    return this._categories().filter(c => ids.some(id => String(id) === String(c.id)));
  }

  async create(name: string): Promise<Category> {
    const ref = collection(this.firestore, 'categories');
    const docRef = await addDoc(ref, { name });
    const newCategory: Category = { id: docRef.id as any, name };
    this._categories.update(current => [...current, newCategory]);
    return newCategory;
  }
}
