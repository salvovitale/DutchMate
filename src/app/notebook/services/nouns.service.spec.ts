import { TestBed } from '@angular/core/testing';

import { NounsService } from './nouns.service';

describe('NounsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NounsService = TestBed.get(NounsService);
    expect(service).toBeTruthy();
  });
});
