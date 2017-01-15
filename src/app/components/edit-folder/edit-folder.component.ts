import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import {IDbFolder} from '../../store';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.css']
})
export class EditFolderComponent implements OnInit {
  @Input() dbFolder: Observable<IDbFolder>;

  public myForm: Observable<any>;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.myForm = this.dbFolder
      .map(dbFolder => {
        return this.fb.group({
          name: [dbFolder.name],
          description: [dbFolder.description],
          hidden: [dbFolder.hidden]
        });
      });
  }

}
