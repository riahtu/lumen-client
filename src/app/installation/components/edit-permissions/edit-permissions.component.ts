import { Component, Input, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
/*https://github.com/yuyang041060120/ng2-validation*/
import { CustomValidators } from 'ng2-validation';
import { environment } from '../../../../environments/environment';

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
  public emailForm: FormGroup;
  public emailField: AbstractControl;

  constructor(
    private permissionService: PermissionService,
    public fb: FormBuilder
  ) {
    this.userType = 'select';
    //standalone installlations cannot invite users
    if (environment.standalone) {
      this.userOptions = [
        { value: 'select', label: 'pick an existing user or group' },
        { value: 'create', label: 'create a new user' }
      ];
    } else {
      this.userOptions = [
        { value: 'select', label: 'pick an existing user or group' },
        { value: 'invite', label: 'invite a user by e-mail' },
        { value: 'create', label: 'create a new user' }
      ];
    }

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
      .subscribe(result => {
        this.permissionModal.hide();
        this.resetModal()
      });
  }
  cancel() {
    this.permissionModal.hide();
  }
  createUserWithPermission(userParams: any) {
    this.permissionService.createUserWithPermission(
      this.nilm.id,
      this.role,
      userParams)
      .subscribe(result => {
        this.permissionModal.hide();
        this.resetModal();
      });
  }
  inviteUserWithPermission() {
    this.permissionService.inviteUserWithPermission(
      this.nilm.id,
      this.role,
      this.emailField.value)
      .subscribe(result => {
        this.permissionModal.hide();
        this.resetModal();
      });
  }
  ngOnInit() {
    this.selectEntries$ = this.permissionService.targets$.map(targets => {
      return targets.map(t => {
        return { value: { id: t.id, type: t.type }, label: `${t.type}: ${t.name}` }
      })
    });
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
    });
    this.emailField = this.emailForm.controls['email'];
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