import {
  Component,
  OnInit,
  EventEmitter
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'account-nilm-form',
  outputs: ['save', 'cancel'],
  templateUrl: './nilm-form.component.html',
  styleUrls: ['./nilm-form.component.css']
})
export class NilmFormComponent implements OnInit {

  save: EventEmitter<any>;
  cancel: EventEmitter<any>;

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.save = new EventEmitter();
    this.cancel = new EventEmitter();
  }

  onCancel() {
    this.cancel.emit();
  }
  onSave() {
    this.save.emit(this.form.value);
  }

  
  ngOnInit() {
     //create the form
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      url: ['',Validators.required]
    });
  }

}
