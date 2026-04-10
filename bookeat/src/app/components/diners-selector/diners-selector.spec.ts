import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinersSelector } from './diners-selector';

describe('DinersSelector', () => {
  let component: DinersSelector;
  let fixture: ComponentFixture<DinersSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinersSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(DinersSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
