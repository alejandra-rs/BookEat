import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReviewPopup } from './write-review-popup';

describe('WriteReviewPopup', () => {
  let component: WriteReviewPopup;
  let fixture: ComponentFixture<WriteReviewPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteReviewPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(WriteReviewPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
