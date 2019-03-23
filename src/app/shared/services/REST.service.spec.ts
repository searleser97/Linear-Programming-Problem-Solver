import { TestBed } from '@angular/core/testing';

import { RESTService } from './REST.service';

describe('RESTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RESTService = TestBed.get(RESTService);
    expect(service).toBeTruthy();
  });
});
