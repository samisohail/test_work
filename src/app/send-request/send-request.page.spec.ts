import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SendRequestPage } from './send-request.page';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

describe('SendRequestPage', () => {
  let component: SendRequestPage;
  let fixture: ComponentFixture<SendRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ FormBuilder ],
      imports: [ FormsModule, ReactiveFormsModule,
        MatTableModule, HttpClientModule, IonicStorageModule.forRoot(), IonicModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
