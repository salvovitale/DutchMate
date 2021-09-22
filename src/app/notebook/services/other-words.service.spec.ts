import { TestBed } from '@angular/core/testing';

import { OtherWordsService } from './other-words.service';

describe('OtherWordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtherWordsService = TestBed.get(OtherWordsService);
    expect(service).toBeTruthy();
  });
});
