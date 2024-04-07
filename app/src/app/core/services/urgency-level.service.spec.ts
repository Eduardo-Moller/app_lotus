import { TestBed } from '@angular/core/testing';

import { UrgencyLevelService } from './urgency-level.service';

describe('UrgencyLevelService', () => {
  let service: UrgencyLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrgencyLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
