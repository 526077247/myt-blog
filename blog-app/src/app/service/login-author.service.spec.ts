import { TestBed } from '@angular/core/testing';

import { LoginAuthorService } from './login-author.service';

describe('LoginAuthorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginAuthorService = TestBed.get(LoginAuthorService);
    expect(service).toBeTruthy();
  });
});
