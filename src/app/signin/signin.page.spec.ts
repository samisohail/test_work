import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninPage } from './signin.page';
import { UserServices } from '../services/user-services.service';
import { ToasterService } from '../shared/services/toaster.service';
import { LocationService } from '../services/location.service';
import { Location, LocationStrategy } from '@angular/common';

xdescribe('SigninPage', () => {
  let component: SigninPage;
  let fixture: ComponentFixture<SigninPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ UserServices, ToasterService, LocationService, Location, LocationStrategy ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
