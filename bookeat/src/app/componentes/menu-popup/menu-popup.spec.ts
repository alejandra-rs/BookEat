import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPopup } from './menu-popup';

describe('MenuPopup', () => {
  let component: MenuPopup;
  let fixture: ComponentFixture<MenuPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
