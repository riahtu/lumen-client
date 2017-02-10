import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
/*https://github.com/yuyang041060120/ng2-validation*/
import { CustomValidators } from 'ng2-validation';

import {
  IDb,
  IDbFolder,
  IStatusMessages
} from '../../store';

import { DbService } from '../../services';


@Component({
  selector: 'app-edit-db',
  templateUrl: './edit-db.component.html',
  styleUrls: ['./edit-db.component.css']
})
export class EditDbComponent implements OnInit {

  @Input() 
  public set db(val: IDb){
    if(val==null){
      return; //TODO: why does a NULL get here???
    }
    this.buildForm(val);
    this.my_db = val;
  }

  @Input() rootFolder: IDbFolder
  @Input() busy: boolean
  @Input() messages: IStatusMessages

  public form: FormGroup;
  public my_db: IDb;

  constructor(
    private fb: FormBuilder,
    private dbService: DbService
  ) { }

  ngOnInit() {
  }

  buildForm(db: IDb) {
    this.form = this.fb.group({
      url: [db.url, Validators.required],
      max_points_per_plot: [db.max_points_per_plot, 
        [Validators.required, CustomValidators.number]]
    });
  }

  refreshDb(){
    this.dbService.refreshDb(this.my_db);
  }
  onSubmit(formValues: IDb){
    //console.log(streamValues);
    formValues.id = this.my_db.id;
    this.dbService.updateDb(formValues);
  }


}
