import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
/*https://github.com/yuyang041060120/ng2-validation*/
import { CustomValidators } from 'ng2-validation';

import {
  NilmService,
} from '../../../services';

import {
  INilm
} from '../../../store/data';

import {InstallationService} from '../../installation.service';

@Component({
  selector: 'app-edit-nilm',
  templateUrl: './edit-nilm.component.html',
  styleUrls: ['./edit-nilm.component.css']
})

export class EditNilmComponent implements OnInit {
  @Input() nilm: INilm
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private nilmService: NilmService,
    private installationService: InstallationService
  )
   { }

  ngOnInit() {
    this.buildForm(this.nilm);
  }

  buildForm(nilm: INilm){
    this.form = this.fb.group({
      name: [nilm.name, Validators.required],
      description: [nilm.description],
      url: [nilm.url, Validators.required],
    });
  }

  refreshNilm(){
    this.installationService.refreshNilm(this.nilm);
  }
  removeNilm(){
    this.nilmService.removeNilm(this.nilm);
  }
  updateNilm(values: any){
    this.nilmService.updateNilm(
      this.nilm, 
      values.name, 
      values.description, 
      values.url
    );
  }

}
