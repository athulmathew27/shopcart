import { TestBed } from '@angular/core/testing';

import { CodService } from './cod.service';

describe('CodService', () => {
  let service: CodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
