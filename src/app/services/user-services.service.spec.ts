import { TestBed } from '@angular/core/testing';

import { UserServices } from './user-services.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './storage.service';
import { IonicStorageModule } from '@ionic/storage';

describe('UserServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule, IonicStorageModule.forRoot() ],
    providers: [ StorageService ]
  }));

  it('should be created', () => {
    const service: UserServices = TestBed.get(UserServices);
    expect(service).toBeTruthy();
  });
});
