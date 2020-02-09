import { TestBed } from '@angular/core/testing';

import { LoginMgeService } from './login-mge.service';

describe('LoginMgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginMgeService = TestBed.get(LoginMgeService);
    expect(service).toBeTruthy();
  });
});
