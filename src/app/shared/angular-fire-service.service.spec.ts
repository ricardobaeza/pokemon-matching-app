import { TestBed } from '@angular/core/testing';

import { AngularFireServiceService } from './angular-fire-service.service';

describe('AngularFireServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularFireServiceService = TestBed.get(AngularFireServiceService);
    expect(service).toBeTruthy();
  });
});
