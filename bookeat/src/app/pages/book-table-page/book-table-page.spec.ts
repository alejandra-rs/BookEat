import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTablePage } from './book-table-page';

describe('BookTablePage', () => {
  let component: BookTablePage;
  let fixture: ComponentFixture<BookTablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTablePage],
    }).compileComponents();

    fixture = TestBed.createComponent(BookTablePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
