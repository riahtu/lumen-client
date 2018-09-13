import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { IJouleModule } from '../../../store/data';


@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {

  @Input()
  public set jouleModule(val: IJouleModule) {
    this.module = val;
    this.buildForm(this.module);
  }

  public form: FormGroup;
  public module: IJouleModule;
  public errors: string[];
  public warnings: string[];
  public notices: string[];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

  buildForm(module: IJouleModule) {
    this.form = this.fb.group({
      name: ['test'],
      description: ['description'],
    });
    /* TODO: enable this, right now the enable doesn't always work
    if(folder.locked){
      this.form.disable();
    } else {
      this.form.enable();
    } */
  }

}
