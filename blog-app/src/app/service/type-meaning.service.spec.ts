import { TestBed } from '@angular/core/testing';

import { TypeMeaningService } from './type-meaning.service';

describe('TypeMeaningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeMeaningService = TestBed.get(TypeMeaningService);
    expect(service).toBeTruthy();
  });
});
