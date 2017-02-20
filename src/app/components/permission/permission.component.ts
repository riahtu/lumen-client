import { Component, Input, OnInit } from '@angular/core';

import {
  IPermission,
} from '../../store';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})

export class PermissionComponent implements OnInit {

  @Input() permission: IPermission;

  constructor() { }

  ngOnInit() {
  }

}
