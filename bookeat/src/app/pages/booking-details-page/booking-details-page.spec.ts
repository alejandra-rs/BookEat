import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailsPage } from './booking-details-page';

describe('BookingDetailsPage', () => {
  let component: BookingDetailsPage;
  let fixture: ComponentFixture<BookingDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
