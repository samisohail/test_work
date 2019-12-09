import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConnectionsPage } from './my-connections.page';
import { UserServices } from 'src/app/services/user-services.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { RequestsService } from 'src/app/services/requests.service';
import { KeysPipe } from 'src/app/pipes/keys.pipe';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

describe('MyConnectionsPage', () => {
  let component: MyConnectionsPage;
  let fixture: ComponentFixture<MyConnectionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConnectionsPage, KeysPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ UserServices, ToasterService, RequestsService ],
      imports: [ HttpClientModule, IonicStorageModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConnectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
