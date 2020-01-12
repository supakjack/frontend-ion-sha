import { TestBed } from '@angular/core/testing';

import { LibsService } from './libs.service';

describe('LibsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibsService = TestBed.get(LibsService);
    expect(service).toBeTruthy();
  });
});
