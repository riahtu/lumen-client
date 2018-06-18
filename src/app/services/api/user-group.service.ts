import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { share } from 'rxjs/operators';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import { IAppState } from '../../app.store';
import {
  UserGroupActions,
  UserActions,
  IUser,
  IUserGroup
} from '../../store/data';
import {
  MessageService
} from '../message.service';

@Injectable()
export class UserGroupService {

  private groupsLoaded: boolean;

  constructor(
    //private http: Http,
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) {
    this.groupsLoaded = false;
  }

  public loadUserGroups(): Observable<any> {
    //only execute request once
    if (this.groupsLoaded) {
      return empty();
    }

    let o = this.http
      .get('user_groups.json', {}).pipe(share());
      
    o.subscribe(
      json => {
        this.groupsLoaded = true;
        //load owned groups (contains user data)
        let objs = normalize(json['owner'], schema.userGroups);
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_OWNER_GROUPS,
          payload: objs
        });
        if (objs.entities['users'] !== undefined) {
          this.ngRedux.dispatch({
            type: UserActions.RECEIVE,
            payload: objs.entities['users']
          })
        }
        //load member groups 
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_MEMBER_GROUPS,
          payload: normalize(json['member'], schema.userGroups)
        });
        //load other groups (generic action)
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_GROUPS,
          payload: normalize(json['other'], schema.userGroups)
        });
      },
      error => this.messageService.setErrorsFromAPICall(error)
      );
    return o;
  }

  public removeMember(group: IUserGroup, member: IUser) {
    this.http
      .put<schema.IApiResponse>(`user_groups/${group.id}/remove_member.json`, { user_id: member.id })
      .subscribe(
      json => {
        let data = normalize(json.data, schema.userGroup)
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_GROUPS,
          payload: data
        })
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
      );
  }

  public addMember(group: IUserGroup, member: IUser) {
    this.http
      .put<schema.IApiResponse>(`user_groups/${group.id}/add_member.json`, { user_id: member.id })
      .subscribe(
      json => {
        let data = normalize(json.data, schema.userGroup)
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_GROUPS,
          payload: data
        })
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
      );
  }

  public inviteMember(group: IUserGroup, email: string) {
    this.http
      .put<schema.IApiResponse>(`user_groups/${group.id}/invite_member.json`, {
        email: email,
        redirect_url: `${window.location.origin}/accept`
      })
      .subscribe(
      json => {
        let data = normalize(json.data, schema.userGroup)
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_GROUPS,
          payload: data
        })
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
      );
  }



  public createMember(group: IUserGroup, userParams: any) {
    let o = this.http
      .put<schema.IApiResponse>(`user_groups/${group.id}/create_member.json`, userParams)
      .pipe(share());
    o.subscribe(
      json => {
        let data = normalize(json.data, schema.userGroup)
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_GROUPS,
          payload: data
        })
        if (data.entities['users'] !== undefined) {
          this.ngRedux.dispatch({
            type: UserActions.RECEIVE,
            payload: data.entities['users']
          })
        }
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
    );
    return o;
  }

  public createGroup(name: string, description: string): Observable<any> {
    let o = this.http
      .post<schema.IApiResponse>('user_groups.json', {
        name: name,
        description: description
      })
      .pipe(share())

    o.subscribe(
      json => {
        let data = normalize(json.data, schema.userGroup)
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_OWNER_GROUPS,
          payload: data
        })
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
    )
    return o; //for other subscribers
  }

  public updateGroup(
    group: IUserGroup,
    name: string,
    description: string): Observable<any> {
    let o = this.http
      .put<schema.IApiResponse>(`user_groups/${group.id}.json`, {
        name: name, description: description
      })
      .pipe(share());
    o.subscribe(
      json => {
        let data = normalize(json.data, schema.userGroup)
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_GROUPS,
          payload: data
        })
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
    )
    return o; //for other subscribers
  }

  public destroyGroup(group: IUserGroup) {
    this.http
      .delete<schema.IApiResponse>(`user_groups/${group.id}.json`)
      .subscribe(
      json => {
        this.ngRedux.dispatch({
          type: UserGroupActions.REMOVE,
          payload: group.id
        })
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrorsFromAPICall(error)
      )
  }

}
