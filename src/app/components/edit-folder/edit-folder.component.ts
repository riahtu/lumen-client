import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { IDbFolder } from '../../store';
import { DbFolderService } from '../../services';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.css']
})
export class EditFolderComponent implements OnInit {
  @Input()
  public set dbFolder(val: IDbFolder) {
    this.buildForm(val);
    this.folder = val;
  }

  public form: FormGroup;
  public folder: IDbFolder;

  constructor(
    private fb: FormBuilder,
    private dbFolderService: DbFolderService
  ) { }

  onSubmit(formValues: IDbFolder) {
    formValues.id = this.folder.id;
    this.dbFolderService.updateFolder(formValues,
      error => {
        console.log(`error on ${this.folder.id}: `, error)
      });
  }

  buildForm(folder: IDbFolder) {
    this.form = this.fb.group({
      name: [folder.name, Validators.required],
      description: [folder.description],
      hidden: [folder.hidden]
    });
  }
  ngOnInit() {

  }

}
