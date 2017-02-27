import { 
  Component, 
  Input, 
  OnInit 
} from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

import{
  IUserGroup,
  IUser,
  IUserRecords
} from '../../../store';

@Component({
  selector: 'account-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @select(['data','users','entities']) users$: Observable<IUserRecords>
  @Input() group: IUserGroup;

  private members$: Observable<IUser[]>

  constructor() { }

  ngOnInit() {
    this.members$ = this.users$.map(users =>
       this.group.members.map(id => users[id])
    );
  }
}
