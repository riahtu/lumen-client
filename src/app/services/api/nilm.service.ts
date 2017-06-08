import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
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
  INilm
} from '../../store/data';
import {
  MessageService
} from '../message.service';


@Injectable()
export class NilmService {

  private nilmsLoaded: boolean;

  constructor(
    //private http: Http,
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) {
    this.nilmsLoaded = false;
  }

  public loadNilms(): Observable<any> {
    if (this.nilmsLoaded) {
      return Observable.empty<any>();
    }

    let o = this.tokenService
      .get('nilms.json', {})
      .map(resp => resp.json())

    o.subscribe(
      json => {
        this.nilmsLoaded = true;
        this.ngRedux.dispatch({
          type: NilmActions.RECEIVE_ADMIN_NILMS,
          payload: normalize(json.admin, schema.nilms)
        });
        this.ngRedux.dispatch({
          type: NilmActions.RECEIVE_OWNER_NILMS,
          payload: normalize(json.owner, schema.nilms)
        });
        this.ngRedux.dispatch({
          type: NilmActions.RECEIVE_VIEWER_NILMS,
          payload: normalize(json.viewer, schema.nilms)
        });
      },
      error => this.messageService.setErrorsFromAPICall(error)
    );
    return o; //for other subscribers
  }

  public createNilm(
    name: string,
    description: string,
    url: string): Observable<any> {
    let o = this.tokenService
      .post('nilms.json', {
        name: name,
        description: description,
        url: url
      })
      .map(resp => resp.json());

    o.subscribe(
      json => {
        let data = normalize(json.data, schema.nilm)
        this.ngRedux.dispatch({
          type: NilmActions.RECEIVE_ADMIN_NILMS,
          payload: data
        })
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
    this.tokenService.put(`nilms/${nilm.id}.json`, {
      name: name,
      description: description,
      url: url
    })
      .map(resp => resp.json())
      .subscribe(
      json => {
        let data = normalize(json.data, schema.nilm)
        this.ngRedux.dispatch({
          type: NilmActions.RECEIVE_NILM,
          payload: data
        })
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
      );
  }

  public refreshNilm(nilm: INilm) {
    let o = this.tokenService
      .put(`nilms/${nilm.id}/refresh.json`, {})
      .map(resp => resp.json())

    o.subscribe(
      json => {
        let data = normalize(json.data, schema.nilm)
        this.ngRedux.dispatch({
          type: NilmActions.RECEIVE_NILM,
          payload: data
        });
        this.processDb(data.entities);
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
    );
    return o;
  }

  public removeNilm(nilm: INilm) {
    let o = this.tokenService
      .delete(`nilms/${nilm.id}.json`)
      .map(resp => resp.json());

    o.subscribe(
      json => {
        this.ngRedux.dispatch({
          type: NilmActions.REMOVE_NILM,
          payload: nilm.id
        });
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
    );
    return o;
  }

  // -------- private helper functions --------
  private processDb(entities) {
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
