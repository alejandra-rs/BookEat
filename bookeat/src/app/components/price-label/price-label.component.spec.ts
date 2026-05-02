import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceLabel } from './price-label';

describe('PriceLabel', () => {
  let component: PriceLabel;
  let fixture: ComponentFixture<PriceLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceLabel],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceLabel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
