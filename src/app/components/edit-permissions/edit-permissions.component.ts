import { Component, Input, OnInit } from '@angular/core';

import {
  PermissionService
} from '../../services';

import {
  IPermission,
} from '../../store';

@Component({
  selector: 'app-edit-permissions',
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.css']
})
export class EditPermissionsComponent implements OnInit {

  @Input() admins: IPermission[]
  @Input() owners: IPermission[]
  @Input() viewers: IPermission[]

  constructor(
    private permissionService: PermissionService
  ) { }

  removePermission(permission: IPermission){
    this.permissionService.removePermission(permission);
  }
  ngOnInit() {
  }

}
