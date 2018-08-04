import { TestBed, inject } from '@angular/core/testing';

import { WritingService } from './writing.service';

describe('WritingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WritingService]
    });
  });

  it('should be created', inject([WritingService], (service: WritingService) => {
    expect(service).toBeTruthy();
  }));
});
