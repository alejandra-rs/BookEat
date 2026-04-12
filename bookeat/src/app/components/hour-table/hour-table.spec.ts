import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourTable } from './hour-table';

describe('HourTable', () => {
  let component: HourTable;
  let fixture: ComponentFixture<HourTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourTable],
    }).compileComponents();

    fixture = TestBed.createComponent(HourTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
