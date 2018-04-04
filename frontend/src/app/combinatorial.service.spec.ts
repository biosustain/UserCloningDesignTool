import { TestBed, inject } from '@angular/core/testing';

import { CombinatorialService } from './combinatorial.service';

describe('CombinatorialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CombinatorialService]
    });
  });

  it('should be created', inject([CombinatorialService], (service: CombinatorialService) => {
    expect(service).toBeTruthy();
  }));
});
