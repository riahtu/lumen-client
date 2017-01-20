import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { 
  IDbFolder,
  IStatusMessage 
} from '../../store';

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
    if(!(this.folder === undefined)){
      if(this.folder.id != val.id){
        this.clearMessages();
      }
    }
    this.buildForm(val);
    this.folder = val;
  }

  public form: FormGroup;
  public folder: IDbFolder;
  public errors: string[];
  public warnings: string[];
  public notices: string[];

  constructor(
    private fb: FormBuilder,
    private dbFolderService: DbFolderService
  ) { }

  ngOnInit() {}

  onSubmit(formValues: IDbFolder) {
    this.clearMessages();
    formValues.id = this.folder.id;
    this.dbFolderService.updateFolder(formValues,
      error => {
        this.errors = (<IStatusMessage>error).errors;
        this.warnings = (<IStatusMessage>error).warnings;
      },
      ok => {
        this.notices = ["Folder updated"];
    });
  }

  buildForm(folder: IDbFolder) {
    this.form = this.fb.group({
      name: [folder.name, Validators.required],
      description: [folder.description],
      hidden: [folder.hidden]
    });
  }

  clearMessages(){
    this.errors = [];
    this.warnings = [];
    this.notices = [];
  }
}
