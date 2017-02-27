import { Component, Input, OnInit } from '@angular/core';


import{
  IUserGroupRecord,
} from '../../../store';

@Component({
  selector: 'app-account-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  @Input() ownedGroups: IUserGroupRecord[];
  @Input() memberGroups: IUserGroupRecord[];
  
  constructor() { }

  ngOnInit() {
  }

}
