import { Component, Input, OnInit } from '@angular/core';
import { IStatusMessages } from '../../store';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() contents: IStatusMessages;
  constructor() { }

  ngOnInit() {
  }

}
