import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';
import{ MessageService } from '../message.service';
import { parseAPIErrors } from './helpers';
import { IAppState } from '../../store';
import {
  IDbStream,
  IDbElement,
  DbStreamActions,
  DbElementActions,
} from '../../store/data';

@Injectable()
export class DbStreamService {


  constructor(
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { }


  public updateStream(stream): void {
    this.tokenService
      .put(`db_streams/${stream.id}.json`, 
        JSON.stringify(stream))
      .map(resp => resp.json())
      .subscribe(
        json => {
          this._dispatch(json.data);
          this.messageService.setMessages(json.messages);
        },
        error => this.messageService.setErrors(parseAPIErrors(error)));  }

  // -------- private helper functions --------
  private _dispatch(json) {
    let entities = normalize(json, schema.dbStream).entities;
    this._receive(DbStreamActions, entities['dbStreams']);
    this._receive(DbElementActions, entities['dbElements']);
  }
  private _receive(target: any, data: any) {
    if (!(data === undefined)) {
      this.ngRedux.dispatch({
        type: target.RECEIVE,
        payload: data
      });
    }
  }

}
