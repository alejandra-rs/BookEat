import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingBreakdown } from './rating-breakdown';

describe('RatingBreakdown', () => {
  let component: RatingBreakdown;
  let fixture: ComponentFixture<RatingBreakdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingBreakdown],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingBreakdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
