import { TestBed } from '@angular/core/testing';

import { AdverbsService } from './adverbs.service';

describe('AdverbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdverbsService = TestBed.get(AdverbsService);
    expect(service).toBeTruthy();
  });
});
