/* tslint:disable:no-unused-variable */

import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { 
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { NilmService } from './nilm.service';

import {} from 'jasmine';

import { NgRedux } from '@angular-redux/store';
import { configureMockStores } from 'redux-mock-store';
/*
const mockRedux = {
  dispatch(action) {},
  configureStore() {},
  select() {
    return Observable.from('test');
  }
}*/

const mockRedux = configureMockStores();

//NgRedux.instance = mockRedux;

fdescribe('NilmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NilmService, 
        BaseRequestOptions,
        MockBackend,
        {
          provide: NgRedux,
          useValue: mockRedux
        },
        { provide: HttpClient,
          useFactory: (backend: ConnectionBackend,
                       defaultOptions: BaseRequestOptions) =>{
                         return new Http(backend, defaultOptions); 
                       }, deps: [MockBackend, BaseRequestOptions] },
      ]
    });
  });
  describe('loadNilms', () => {
    it('populates store with nilms', 
      inject([NilmService, MockBackend], fakeAsync((nilmService, mockBackend) => {
        var res;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('nilms.json');
          let response = new ResponseOptions({body: 'test'});
          c.mockRespond(new Response(response));
        });
        nilmService.loadNilms();
        tick();
        //TODO: check that the store now has nilms in it
        console.log(mockRedux.getActions());
        expect(nilmService).toBeTruthy();
      }))
    );
  });
});
