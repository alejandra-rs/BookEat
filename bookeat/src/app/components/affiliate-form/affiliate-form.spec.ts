import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateFormComponent } from './affiliate-form';

describe('AffiliateFormComponent', () => {
  let component: AffiliateFormComponent;
  let fixture: ComponentFixture<AffiliateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffiliateFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AffiliateFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
