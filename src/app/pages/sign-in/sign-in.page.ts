import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

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
    private tokenService: Angular2TokenService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(formValues: any){
    this.tokenService.signIn({email: formValues.email,
                              password: formValues.password})
                      .subscribe(
                        res => console.log(res),
                        error => console.log(error));
  }

}
