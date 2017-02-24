import { Component, Input, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ng2-bootstrap/modal';

import {
  PermissionService,
  PermissionTarget
} from '../../services/api/permission.service';

import {
  IPermission,
  INilm
} from '../../store';

@Component({
  selector: 'app-edit-permissions',
  outputs: ['getTargets'],
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.css']
})
export class EditPermissionsComponent implements OnInit {
  @ViewChild('permissionModal') public permissionModal:ModalDirective;

  @Input() admins: IPermission[]
  @Input() owners: IPermission[]
  @Input() viewers: IPermission[]
  @Input() nilm: INilm

  private selectEntries$: Observable<SelectEntry[]>;

  private role: string;
  private target: any;

  constructor(
    private permissionService: PermissionService
  ) {
    this.resetModal();
  }

  resetModal() {
    //clear out the fields
    this.target = null;
    this.role = "viewer";
  }
  addPermissionShown() {
    this.permissionService.loadTargets();
  }
  removePermission(permission: IPermission) {
    this.permissionService.removePermission(permission);
  }
  createPermission() {
    console.log(this.role, this.target['id']);
    this.permissionService.createPermission(
      this.nilm.id,
      this.role,
      this.target['id'],
      this.target['type']).subscribe( result => this.permissionModal.hide());
  }
  ngOnInit() {
    this.selectEntries$ = this.permissionService.targets$.map(targets => {
      console.log(targets);
      return targets.map(t => {
        return { value: { id: t.id, type: t.type }, label: `${t.type}: ${t.name}` }
      })
    });
  }

}

interface SelectEntry {
  value: {},
  label: string
}