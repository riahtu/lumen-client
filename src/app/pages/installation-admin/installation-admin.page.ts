import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select } from 'ng2-redux';


import {
  PermissionService
} from '../../services';

import {
  IPermissionRecords,
  IPermission,
  INilmRecord,
  IUserRecords,
  IUserGroupRecords
} from '../../store';

@Component({
  selector: 'app-installation-admin',
  templateUrl: './installation-admin.page.html',
  styleUrls: ['./installation-admin.page.css']
})
export class InstallationAdminPageComponent implements OnInit {

  @select(['data', 'permissions']) permissions$: Observable<IPermissionRecords>;
  @select(['data','users','entities']) users$: Observable<IUserRecords>;
  @select(['data','groups','entities']) groups$: Observable<IUserGroupRecords>;

  @Input() nilm: Observable<INilmRecord>

  public admins$: Observable<IPermission[]>
  public owners$: Observable<IPermission[]>
  public viewers$: Observable<IPermission[]>

  private nilmSub: Subscription;
  constructor(
    private permissionService: PermissionService
  ) { 
    
  }

  ngOnInit() {
    this.nilmSub = this.nilm.subscribe(
      nilm => this.permissionService.loadPermissions(nilm.id)
    )
    let nilmPermissions = 
    this.nilm.combineLatest(this.permissions$)
    .map(([nilm, permissions]) => {
      let values = Object.keys(permissions)
                              .map(id=>permissions[id])
      return values.filter(p => p.nilm_id==nilm.id)
    });
    this.admins$ = nilmPermissions.map(permissions =>
      permissions.filter(p => p.role=='admin'))
    this.owners$ = nilmPermissions.map(permissions =>
      permissions.filter(p => p.role=='owner'))
    this.viewers$ = nilmPermissions.map(permissions =>
      permissions.filter(p => p.role=='viewer'))
  }

  ngOnDestroy() {
    this.nilmSub.unsubscribe();
  }
}
