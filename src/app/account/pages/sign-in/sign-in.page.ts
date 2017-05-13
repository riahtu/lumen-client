import { Component, OnInit } from '@angular/core';

import {
  SessionService
} from "../../../services";
/*https://github.com/yuyang041060120/ng2-validation*/
import { CustomValidators } from 'ng2-validation';
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
      email: ['', [Validators.required, CustomValidators.email]],
      password: ['']
    });
  }
  onSubmit(formValues: any){
    this.sessionService.login(formValues.email, formValues.password)
  }


  resetPassword(email: string){
    this.sessionService.resetPassword(email);
  }
}
