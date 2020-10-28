import { TestBed } from '@angular/core/testing';

import { PayUMoneyServiceService } from './pay-umoney-service.service';

describe('PayUMoneyServiceService', () => {
  let service: PayUMoneyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayUMoneyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
