import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { ModalDirective } from 'ng2-bootstrap/modal';

import {
  IUserGroup,
  IUser,
  IUserRecords
} from '../../../store';

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
  @select(['data', 'users', 'entities']) users$: Observable<IUserRecords>
  @Input() group: IUserGroup;

  private members$: Observable<IUser[]>
  private selectEntries$: Observable<ISelectEntry[]>

  constructor(
    private userGroupService: UserGroupService,
    private userService: UserService
  ) { }


  destroyGroup(){
    this.userGroupService.destroyGroup(this.group);
  }
  updateGroup(values: any){
    console.log('updating...');
   // this.userGroupService.updateGroup(this.group, values.name, values.description);
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
  resetModal(){

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