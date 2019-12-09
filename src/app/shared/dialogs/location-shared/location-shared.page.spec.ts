import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSharedPage } from './location-shared.page';

describe('LocationSharedPage', () => {
  let component: LocationSharedPage;
  let fixture: ComponentFixture<LocationSharedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSharedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSharedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
