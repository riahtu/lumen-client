/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NilmService } from './nilm.service';
import {} from 'jasmine';

describe('NilmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NilmService]
    });
  });

  it('should ...', inject([NilmService], (service: NilmService) => {
    expect(service).toBeTruthy();
  }));
});
