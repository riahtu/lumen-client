import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
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
  @Input() dbFolderId: Observable<number>;
  @select(['nilm']) nilms$: Observable<any>;
  @select(['dbAdmin', 'selected_id']) selectedId$: Observable<number>;

  public myForm: Observable<any>;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = Observable
      .combineLatest(this.nilms$, this.dbFolderId)
      .filter(([entities, dbFolderId]) =>
        'dbFolders' in entities)
      .map(([entities, dbFolderId]) => {
        let folder = entities.dbFolders[dbFolderId];
        return this.fb.group({
          name: [folder.name],
          description: [folder.description],
          hidden: [folder.hidden]
        });
      });
  }

}
