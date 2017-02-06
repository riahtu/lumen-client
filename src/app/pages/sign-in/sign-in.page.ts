import { Component, OnInit } from '@angular/core';

import {
  SessionService
} from "../../services";

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.css']
})
export class SignInPageComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(formValues: any){
    this.sessionService.login(formValues.email, formValues.password);
  }

}
