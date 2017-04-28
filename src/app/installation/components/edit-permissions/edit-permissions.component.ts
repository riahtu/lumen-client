import { Component, Input, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
  PermissionService,
  PermissionTarget
} from '../../../services/api/permission.service';

import {
  IPermission,
  INilm
} from '../../../store/data';

@Component({
  selector: 'app-edit-permissions',
  outputs: ['getTargets'],
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.css']
})
export class EditPermissionsComponent implements OnInit {
  @ViewChild('permissionModal') public permissionModal: ModalDirective;

  @Input() admins: IPermission[]
  @Input() owners: IPermission[]
  @Input() viewers: IPermission[]
  @Input() nilm: INilm

  public selectEntries$: Observable<SelectEntry[]>;

  public target: any;
  public userType: string;
  public userOptions: any[];
  public role: string;
  public roleOptions: any[];

  constructor(
    private permissionService: PermissionService
  ) {
    this.userType = 'select';
    this.userOptions = [
      { value: 'select', label: 'pick an existing user or group' },
      { value: 'invite', label: 'invite a user by e-mail' },
      { value: 'create', label: 'create a new user' }
    ];
    this.role = 'viewer';
    this.roleOptions = [
      { value: 'viewer', label: 'a viewer' },
      { value: 'owner', label: 'an owner' },
      { value: 'admin', label: 'an admin' }
    ];
    this.resetModal();
  }

  resetModal() {
    //clear out the fields
    this.target = null;
    this.role = "viewer";
    this.userType = 'select';
  }
  addPermissionShown() {
    this.permissionService.loadTargets();
    this.resetModal();
  }
  removePermission(permission: IPermission) {
    this.permissionService.removePermission(permission);
  }
  createPermission(selection: SelectionValue) {
    this.permissionService.createPermission(
      this.nilm.id,
      this.role,
      selection.id,
      selection.type)
      .subscribe(result => this.permissionModal.hide());
  }
  cancel() {
    this.permissionModal.hide();
  }
  createUserWithPermission(userParams: any) {
    this.permissionService.createUserWithPermission(
      this.nilm.id,
      this.role,
      userParams)
      .subscribe(
      success => this.permissionModal.hide()
      );
  }
  ngOnInit() {
    this.selectEntries$ = this.permissionService.targets$.map(targets => {
      return targets.map(t => {
        return { value: { id: t.id, type: t.type }, label: `${t.type}: ${t.name}` }
      })
    });
  }

}

interface SelectEntry {
  value: SelectionValue,
  label: string
}
interface SelectionValue {
  id: number,
  type: string
}