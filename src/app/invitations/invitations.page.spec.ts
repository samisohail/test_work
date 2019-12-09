import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsPage } from './invitations.page';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatDialogModule } from '@angular/material';
import { RequestsService } from '../services/requests.service';

describe('InvitationsPage', () => {
  let component: InvitationsPage;
  let fixture: ComponentFixture<InvitationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ HttpClientModule, MatIconModule, MatDialogModule ],
      providers: [ RequestsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
