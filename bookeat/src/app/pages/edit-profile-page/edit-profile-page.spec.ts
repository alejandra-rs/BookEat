import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePage } from './edit-profile-page';

describe('EditProfilePage', () => {
  let component: EditProfilePage;
  let fixture: ComponentFixture<EditProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfilePage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfilePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
