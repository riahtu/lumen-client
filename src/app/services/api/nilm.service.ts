import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import { IAppState } from '../../app.store';
import {
  NilmActions,
  DbActions,
  DbFolderActions,
  DbStreamActions,
  DbElementActions,
  INilm,
  JouleModuleActions
} from '../../store/data';
import {
  MessageService
} from '../message.service';


@Injectable()
export class NilmService {

  private nilmsLoaded: boolean;

  constructor(
    //private http: Http,
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) {
    this.nilmsLoaded = false;
  }

  public loadNilms(): Observable<any> {
    if (this.nilmsLoaded) {
      return empty();
    }

    let o = this.http
      .get('nilms.json', {})

    o.subscribe(
      json => {
        this.nilmsLoaded = true;
        let data = normalize(json, schema.nilms)
        this._dispatch(data.entities);
      },
      error => this.messageService.setErrorsFromAPICall(error)
    );
    return o; //for other subscribers
  }

  public loadNilm(id: number): Observable<any> {
    let o = this.http
      .get<schema.IApiResponse>(`nilms/${id}.json`, {})

    o.subscribe(
      json => {
        let data = normalize(json.data, schema.nilm)
        this._dispatch(data.entities);
      },
      error => this.messageService.setErrorsFromAPICall(error)
    );
    return o; //for other subscribers
  }
  public createNilm(
    name: string,
    description: string,
    url: string): Observable<any> {
    let o = this.http
      .post<schema.IApiResponse>('nilms.json', {
        name: name,
        description: description,
        url: url
      })

    o.subscribe(
      json => {
        let data = normalize(json.data, schema.nilm)
        this._dispatch(data.entities);
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
    )
    return o; //for other subscribers
  }

  public updateNilm(
    nilm: INilm,
    name: string,
    description: string,
    url: string) {
    this.http.put<schema.IApiResponse>(`nilms/${nilm.id}.json`, {
      name: name,
      description: description,
      url: url
    }).subscribe(
      json => {
        let data = normalize(json.data, schema.nilm)
        this._dispatch(data.entities);
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
      );
  }

  public refreshNilm(id: number) {
    let o = this.http
    .get<schema.IApiResponse>(`nilms/${id}.json?refresh=1`, {})
    this.ngRedux.dispatch({
      type: NilmActions.REFRESHING,
      payload: id
    });
    o.subscribe(
      json => {
        let data = normalize(json.data, schema.nilm)
        this.messageService.setNotice("Updated installation")
        this._dispatch(data.entities);
      },
      error => {
        this.ngRedux.dispatch({
          type: NilmActions.REFRESHED,
          payload: id
        })
        this.messageService.setErrorsFromAPICall(error)
      }
    );
    return o; //for other subscribers
  }

  public removeNilm(nilm: INilm) {
    let o = this.http
      .delete<schema.IApiResponse>(`nilms/${nilm.id}.json`)

    o.subscribe(
      json => {
        this.ngRedux.dispatch({
          type: NilmActions.REMOVE,
          payload: nilm.id
        });
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
    );
    return o;
  }

  // -------- private helper functions --------
  private _dispatch(entities) {
    this._receive(NilmActions, entities['nilms']);
    this._receive(JouleModuleActions, entities['jouleModules']);
    this._receive(DbActions, entities['dbs']);
    this._receive(DbFolderActions, entities['dbFolders']);
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
