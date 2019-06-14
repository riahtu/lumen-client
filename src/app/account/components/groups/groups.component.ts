import {
  Component,
  Input,
  ViewChild,
  OnInit
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
  UserGroupService
} from '../../../services';

import {
  IUserGroupRecord,
} from '../../../store/data';
import {AccountSelectors} from '../../account.selectors';

@Component({
  selector: 'app-account-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @ViewChild('newGroupModal', { static: false }) public newGroupModal: ModalDirective;

  constructor(
    private userGroupService: UserGroupService,
    public accountSelectors: AccountSelectors
  ) {

  }

  ngOnInit() {
  }

  createGroup(values: any) {
    console.log("I got called!")
    this.userGroupService
      .createGroup(values.name, values.description)
      .subscribe(_ => {
        this.newGroupModal.hide()});
  }

}
