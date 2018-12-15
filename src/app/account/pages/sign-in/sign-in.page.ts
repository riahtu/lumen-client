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
import { environment } from '../../../../environments/environment';
import { AccountService } from 'app/account/account.service';
import { AccountSelectors } from 'app/account/account.selectors';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.css']
})
export class SignInPageComponent implements OnInit {

  public form: FormGroup;
  public slides: ISlide[];
  public isStandalone: boolean;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private accountService: AccountService,
    public accountSelectors: AccountSelectors
  ) {
    this.isStandalone = environment.standalone;
    
    this.slides = [
      {
        url: "assets/images/slides/Slide1.png",
        name: 'Visualize',
        description: 'view data from decades to microseconds'
      },
      {
        url: "assets/images/slides/Slide3.png",
        name: 'Analyze',
        description: 'export data directly to MATLAB or Excel'
      },
      {
        url: "assets/images/slides/Slide2.png",
        name: 'Collaborate',
        description: 'share data on your terms'
      },
      {
        url: "assets/images/slides/Slide4.png",
        name: 'Visualize',
        description: 'stream realtime sensor data'
      },
      {
        url: "assets/images/slides/Slide5.png",
        name: 'Analyze',
        description: 'quickly identify trends and anamolies'
      },
      {
        url: "assets/images/slides/Slide6.png",
        name: 'Organize',
        description: 'navigate terabytes of data in your browser'
      },
    ]
  }

  ngOnInit() {    
    this.form = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      password: ['']
    });
  }
  onSubmit(formValues: any) {
    this.accountService.setLoggingIn(true);
    
    this.sessionService.login(formValues.email, 
      formValues.password).subscribe(
        json => {console.log("here!"); this.accountService.setLoggingIn(false)},
        error => {console.log("there!"); this.accountService.setLoggingIn(false)}
      )
  }


  resetPassword(email: string) {
    this.sessionService.resetPassword(email);
  }
}

export interface ISlide{
  name: string,
  url: string,
  description: string
}