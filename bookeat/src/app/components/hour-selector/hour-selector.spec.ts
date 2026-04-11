import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourSelector } from './hour-selector';

describe('HourSelector', () => {
  let component: HourSelector;
  let fixture: ComponentFixture<HourSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(HourSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
