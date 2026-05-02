import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScore } from './user-score';

describe('UserScore', () => {
  let component: UserScore;
  let fixture: ComponentFixture<UserScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserScore],
    }).compileComponents();

    fixture = TestBed.createComponent(UserScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
