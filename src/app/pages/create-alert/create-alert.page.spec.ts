import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlertPage } from './create-alert.page';

describe('CreateAlertPage', () => {
  let component: CreateAlertPage;
  let fixture: ComponentFixture<CreateAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAlertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
