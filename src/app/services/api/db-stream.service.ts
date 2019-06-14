import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';
import { MessageService } from '../message.service';
import { IAppState } from '../../app.store';
import {
  IDbStream,
  IDbElement,
  DbStreamActions,
  DbElementActions,
} from '../../store/data';

@Injectable()
export class DbStreamService {


  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { }


  public loadStreams(streamIDs: number[]): void {
    let urlParams = new URLSearchParams;
    urlParams.set('streams',JSON.stringify(streamIDs))

    this.http
      .get(`db_streams.json`, {
        params: new HttpParams().set('streams',JSON.stringify(streamIDs))})
      .subscribe(
      json => {
        let entities = normalize(json, schema.dbStreams).entities;
        this._dispatch(entities);
        error => this.messageService.setErrorsFromAPICall(error)
      });
  }

  public updateStream(stream): void {
    this.http
      .put<schema.IApiResponse>(`db_streams/${stream.id}.json`, stream)
      .subscribe(
      json => {
        let entities = normalize(json.data, schema.dbStream).entities;
        this._dispatch(entities);
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error));
  }

  // -------- private helper functions --------
  private _dispatch(entities) {
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
