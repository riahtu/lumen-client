
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { select } from '@angular-redux/store';


import {
  PermissionService
} from '../../../services';

import {
  IPermissionRecords,
  IPermission,
  INilmRecord,
  IUserRecords,
  IUserGroupRecords
} from '../../../store/data';
import { InstallationSelectors } from '../../installation.selectors';

@Component({
  selector: 'installation-admin-tab',
  templateUrl: './admin.tab.html',
  styleUrls: ['./admin.tab.css']
})
export class AdminTabComponent implements OnInit {

  @select(['data', 'permissions']) permissions$: Observable<IPermissionRecords>;
  @select(['data','users','entities']) users$: Observable<IUserRecords>;
  @select(['data','groups','entities']) groups$: Observable<IUserGroupRecords>;

  public admins$: Observable<IPermission[]>
  public owners$: Observable<IPermission[]>
  public viewers$: Observable<IPermission[]>

  private nilmSub: Subscription;
  constructor(
    private permissionService: PermissionService,
    public installationSelectors: InstallationSelectors
  ) { 
    
  }

  ngOnInit() {
    this.nilmSub = this.installationSelectors.nilm$.subscribe(
      nilm => this.permissionService.loadPermissions(nilm.id)
    )
    let nilmPermissions = combineLatest(
      this.installationSelectors.nilm$, this.permissions$).pipe(
      map(([nilm, permissions]) => {
        let values = Object.keys(permissions)
                                .map(id=>permissions[id])
        return values.filter(p => p.nilm_id==nilm.id)
      }));
    this.admins$ = nilmPermissions.pipe(map(permissions =>
      permissions.filter(p => p.role=='admin')))
    this.owners$ = nilmPermissions.pipe(map(permissions =>
      permissions.filter(p => p.role=='owner')))
    this.viewers$ = nilmPermissions.pipe(map(permissions =>
      permissions.filter(p => p.role=='viewer')))
  }

  ngOnDestroy() {
    this.nilmSub.unsubscribe();
  }
}
