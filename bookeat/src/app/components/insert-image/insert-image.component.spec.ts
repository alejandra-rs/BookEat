import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertImage } from './insert-image';

describe('InsertImage', () => {
  let component: InsertImage;
  let fixture: ComponentFixture<InsertImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertImage],
    }).compileComponents();

    fixture = TestBed.createComponent(InsertImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
