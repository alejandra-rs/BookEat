import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileImagePopup } from './edit-profile-image-popup';

describe('EditProfileImagePopup', () => {
  let component: EditProfileImagePopup;
  let fixture: ComponentFixture<EditProfileImagePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileImagePopup],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileImagePopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
