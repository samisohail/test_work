import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { Storage, IonicStorageModule } from '@ionic/storage';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [IonicStorageModule.forRoot()]
  }));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });
});
