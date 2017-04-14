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

import{
  IUserGroupRecord,
} from '../../../store/data';

@Component({
  selector: 'app-account-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @ViewChild('newGroupModal') public newGroupModal: ModalDirective;
  @Input() ownedGroups: IUserGroupRecord[];
  @Input() memberGroups: IUserGroupRecord[];
  

  constructor(
    private userGroupService: UserGroupService
  ) {
    
   }

  ngOnInit() {
  }

  createGroup(values: any){
    this.userGroupService
      .createGroup(values.name, values.description)
      .subscribe(result => this.newGroupModal.hide());
  }

}
