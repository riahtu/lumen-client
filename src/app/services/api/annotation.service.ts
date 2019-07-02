import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';
import { MessageService } from '../message.service';
import { IAppState } from '../../app.store';

import {
  DbStreamActions,
  AnnotationActions,
  IAnnotation,
} from '../../store/data';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { AnnotationUIActions } from 'app/explorer/store';

@Injectable()
export class AnnotationService {

  private annotatedStreams: number[];

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { 
    this.annotatedStreams = [];
  }

  //create a new annotation
  public createAnnotation(annotation: IAnnotation){
    let params = {
      title: annotation.title,
      content: annotation.content,
      start: annotation.start*1e3,
      end: null,
      db_stream_id: annotation.db_stream_id,
    }
    if(annotation.end != null){
      params.end = annotation.end * 1e3
    }
    this.http
      .post(`/db_streams/${annotation.db_stream_id}/annotations.json`, params)
      .subscribe(
      json => {
        let normalized = normalize(json['data'], schema.annotation)
        this.ngRedux.dispatch({
          type: AnnotationActions.RECEIVE,
          payload: normalized.entities['annotations']
        });
        this.ngRedux.dispatch({
          type: AnnotationUIActions.SHOW_ANNOTATION,
          payload: normalized.result
        })
    })
  }


  public loadAnnotations(dbStreamId: number): Observable<any> {
    if(this.annotatedStreams.indexOf(dbStreamId)>-1){
      return;
    }
    let o = this.http
      .get(`db_streams/${dbStreamId}/annotations.json`, {})
      .pipe(share())

    o.subscribe(
      json => {
        let annotations = normalize(json, schema.annotations).entities['annotations'];
        this.ngRedux.dispatch({
            type: AnnotationActions.RECEIVE,
            payload: annotations
          });
        if(this.annotatedStreams.indexOf(dbStreamId)==-1)
          this.annotatedStreams.push(dbStreamId);
      },
      error => this.messageService.setErrorsFromAPICall(error));
    return o;
  }
  public reloadAnnotations(dbStreamId: number): void{
    let index = this.annotatedStreams.indexOf(dbStreamId);
    if(index==-1){
      return; //annotations were never loaded, nothing to do
    }

    this.annotatedStreams.splice(index,1);
    this.ngRedux.dispatch({
      type: DbStreamActions.REFRESHING_ANNOTATIONS,
      payload: dbStreamId
    })

    this.loadAnnotations(dbStreamId).subscribe(
      json => {
        this.messageService.setNotice("reloaded annotations")
        this.ngRedux.dispatch({
          type: DbStreamActions.REFRESHED_ANNOTATIONS,
          payload: dbStreamId
        })
      },
      error => {
        this.ngRedux.dispatch({
          type: DbStreamActions.REFRESHED_ANNOTATIONS,
          payload: dbStreamId
        })
      });
  }
  public deleteAnnotation(annotation: IAnnotation): void{
    console.log(annotation)
    this.http
      .delete(`/db_streams/${annotation.db_stream_id}/annotations/${annotation.joule_id}.json`, {})
      .subscribe(
      json => {
        this.ngRedux.dispatch({
          type: AnnotationActions.REMOVE,
          payload: annotation.id
        })
        this.messageService.setMessages(json['messages']);
      },
      error => this.messageService.setErrorsFromAPICall(error)
      )
  }
}
