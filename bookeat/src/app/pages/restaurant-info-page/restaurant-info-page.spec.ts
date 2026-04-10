import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantInfoPage } from './restaurant-info-page';

describe('RestaurantInfoPage', () => {
  let component: RestaurantInfoPage;
  let fixture: ComponentFixture<RestaurantInfoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantInfoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantInfoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
