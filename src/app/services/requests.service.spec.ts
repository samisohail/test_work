import { TestBed } from '@angular/core/testing';

import { RequestsService } from './requests.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

describe('RequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [Location]
  }));

  it('should be created', () => {
    const service: RequestsService = TestBed.get(RequestsService);
    expect(service).toBeTruthy();
  });
});
