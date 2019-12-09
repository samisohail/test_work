import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupPage } from './signup.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToasterService } from '../shared/services/toaster.service';
import { UserServices } from '../services/user-services.service';
import { IonicStorageModule } from '@ionic/storage';
import { Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupPage', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ ToasterService, UserServices, Location,
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '/signup'},
      { provide: ActivatedRoute, useValue: mockRouter} ],
      imports: [ BrowserAnimationsModule, RouterTestingModule, ReactiveFormsModule,
        FormsModule, MatSelectModule, MatInputModule, HttpClientModule,
        IonicStorageModule.forRoot()  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
