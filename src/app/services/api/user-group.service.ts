import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { NgRedux } from 'ng2-redux';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import { IAppState } from '../../store';
import {
  UserGroupActions,
  UserActions,
  IUser,
  IUserGroup
} from '../../store/data';
import {
  MessageService
} from '../message.service';
import {
  parseAPIErrors
} from './helpers';

@Injectable()
export class UserGroupService {

  private groupsLoaded: boolean;

  constructor(
    //private http: Http,
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) {
    this.groupsLoaded = false;
  }

  public loadUserGroups(): void {
    //only execute request once
    if (this.groupsLoaded) {
      return;
    }

    this.tokenService
      .get('user_groups.json', {})
      .map(resp => resp.json())
      .subscribe(
      json => {
        this.groupsLoaded = true;
        //load owned groups (contains user data)
        let objs = normalize(json.owner, schema.userGroups);
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
          payload: normalize(json.member, schema.userGroups)
        });
        //load other groups (generic action)
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_GROUPS,
          payload: normalize(json.other, schema.userGroups)
        });
      },
      error => this.messageService.setErrors(parseAPIErrors(error))
      );
  }

  public removeMember(group: IUserGroup, member: IUser) {
    this.tokenService
      .put(`user_groups/${group.id}/remove_member.json`, {user_id: member.id})
      .map(resp => resp.json())
      .subscribe(
      json => {
        let data = normalize(json.data, schema.userGroup)
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE_GROUPS,
          payload: data
        })
        this.messageService.setMessages(json.messages);
      },
      error => this.messageService.setErrors(parseAPIErrors(error))
      );
  }
}
