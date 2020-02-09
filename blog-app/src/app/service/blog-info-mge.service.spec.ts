import {TestBed} from '@angular/core/testing';

import {BlogInfoMgeSvr} from './blog-info-mge.service';

describe('BlogInfoMgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogInfoMgeSvr = TestBed.get(BlogInfoMgeSvr);
    expect(service).toBeTruthy();
  });
});
