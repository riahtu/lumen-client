import {
  Component,
  Input,
  OnInit,
  EventEmitter
} from '@angular/core';
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
} from '../../../store/data';

import { DbService } from '../../../services';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-db',
  outputs: ['refresh'],
  templateUrl: './edit-db.component.html',
  styleUrls: ['./edit-db.component.css']
})
export class EditDbComponent implements OnInit {

  @Input()
  public set db(val: IDb) {
    if (val == null) {
      return; //TODO: why does a NULL get here???
    }
    this.buildForm(val);
    this.my_db = val;
  }

  @Input() rootFolder: IDbFolder
  @select(['ui','installation','busy']) busy$: Observable<boolean>;
  @select(['ui','installation','refreshing']) refreshing$: Observable<boolean>;
  refresh: EventEmitter<any>;

  public form: FormGroup;
  public my_db: IDb;

  constructor(
    private fb: FormBuilder,
    private dbService: DbService
  ) {
    this.refresh = new EventEmitter();

  }

  ngOnInit() {
  }

  buildForm(db: IDb) {
    this.form = this.fb.group({
      url: [db.url, Validators.required],
      max_points_per_plot: [db.max_points_per_plot,
      [Validators.required, CustomValidators.number]]
    });
  }

  refreshDb() {
    this.refresh.emit();
  }
  onSubmit(formValues: IDb) {
    //console.log(streamValues);
    formValues.id = this.my_db.id;
    this.dbService.updateDb(formValues);
  }


}
