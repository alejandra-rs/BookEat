import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantReviewsPage } from './restaurant-reviews-page';

describe('RestaurantReviewsPage', () => {
  let component: RestaurantReviewsPage;
  let fixture: ComponentFixture<RestaurantReviewsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantReviewsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantReviewsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
