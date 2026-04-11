import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCarousel } from './restaurant-carousel';

describe('RestaurantCarousel', () => {
  let component: RestaurantCarousel;
  let fixture: ComponentFixture<RestaurantCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
