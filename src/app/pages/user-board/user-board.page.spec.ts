import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBoardPage } from './user-board.page';

describe('UserBoardPage', () => {
  let component: UserBoardPage;
  let fixture: ComponentFixture<UserBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBoardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
