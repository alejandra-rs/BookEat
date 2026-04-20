import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category.model';
import {firstValueFrom} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:3000';

  private _categories = signal<Category[]>([]);
  readonly categories = this._categories.asReadonly();

  load(): void {
    if (this._categories().length > 0) return;
    this.http.get<Category[]>(`${this.BASE_URL}/categories`).subscribe(data => {
      this._categories.set(data);
    });
  }

  resolve(ids: string[]): Category[] {
    return this._categories().filter(c => ids.includes(c.id));
  }

  async create(name: string): Promise<Category> {
    const newCategory = await firstValueFrom(
      this.http.post<Category>(`${this.BASE_URL}/categories`, { name })
    );
    this._categories.update(current => [...current, newCategory]);
    return newCategory;
  }

}
