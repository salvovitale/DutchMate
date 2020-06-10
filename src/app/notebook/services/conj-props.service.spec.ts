import { TestBed } from '@angular/core/testing';

import { ConjPropsService } from './conj-props.service';

describe('ConjPropService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConjPropsService = TestBed.get(ConjPropsService);
    expect(service).toBeTruthy();
  });
});
