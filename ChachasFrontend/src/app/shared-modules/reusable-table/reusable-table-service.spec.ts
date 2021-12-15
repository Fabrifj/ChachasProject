import { TestBed } from '@angular/core/testing';

import { ReusableTableService } from './reusable-table-service';

describe('TablaReusableService', () => {
  let service: ReusableTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReusableTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
