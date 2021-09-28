import { TestBed } from '@angular/core/testing';

import { SearchWordService } from './search-word.service';

describe('SearchWordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchWordService = TestBed.get(SearchWordService);
    expect(service).toBeTruthy();
  });
});
