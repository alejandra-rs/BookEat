import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarSelector } from './star-selector';

describe('StarSelector', () => {
  let component: StarSelector;
  let fixture: ComponentFixture<StarSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(StarSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
