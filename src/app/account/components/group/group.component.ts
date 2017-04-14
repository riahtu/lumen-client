import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
  IUserGroup,
  IUser,
  IUserRecords
} from '../../../store/data';

import {
  UserGroupService,
  UserService
} from '../../../services';

@Component({
  selector: 'account-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @ViewChild('userModal') public userModal: ModalDirective;
  @ViewChild('groupModal') public groupModal: ModalDirective;

  @select(['data', 'users', 'entities']) users$: Observable<IUserRecords>
  @Input() group: IUserGroup;

  private members$: Observable<IUser[]>
  private selectEntries$: Observable<ISelectEntry[]>
  private userType: string;
  private userOptions: any[];

  constructor(
    private userGroupService: UserGroupService,
    private userService: UserService
  ) {
    this.userType='select';
    this.userOptions = [
      {value: 'select', label: 'pick an existing user or group'},
      {value: 'invite', label: 'invite a user by e-mail'},
      {value: 'create', label: 'create a new user'}
    ];
   }


  destroyGroup(){
    this.userGroupService.destroyGroup(this.group);
  }
  updateGroup(values: any){
    this.userGroupService.updateGroup(
      this.group, 
      values.name, 
      values.description)
    .subscribe(resp => this.groupModal.hide())
  }
  removeMember(user: IUser) {
    this.userGroupService.removeMember(this.group, user);
  }
  addMember(user: IUser) {
    this.userGroupService.addMember(this.group, user);
  }
  addMemberShown(){
    this.userService.loadUsers();
  }
  cancel(){
    this.userModal.hide();
  }
  createMember(values: any){
    this.userGroupService.createMember(this.group, values)
      .subscribe(
        success => this.userModal.hide()
      );
  }
  
  ngOnInit() {
    this.members$ = this.users$.map(users =>
      this.group.members.map(id => users[id])
    );
    this.selectEntries$ = this.users$.map(users => {
      return Object.keys(users).map(id => {
        let user = users[id];
        return { value: user, label: `${user.first_name} ${user.last_name}` }
      });
    });
  }
}


interface ISelectEntry {
  value: IUser,
  label: string
}