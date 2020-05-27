import { TestBed } from '@angular/core/testing';

import { AdjectivesService } from './adjectives.service';

describe('AdjectivesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdjectivesService = TestBed.get(AdjectivesService);
    expect(service).toBeTruthy();
  });
});
