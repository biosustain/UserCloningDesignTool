/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeqRecordService } from './seq-record.service';

describe('Service: SeqRecord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeqRecordService]
    });
  });

  it('should ...', inject([SeqRecordService], (service: SeqRecordService) => {
    expect(service).toBeTruthy();
  }));
});
