import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select } from 'ng2-redux';

import {
  SessionService,
  UserGroupService,
  NilmService
} from '../../../services';

import{
  IUserRecord,
  IUserStoreRecord,
  IUserGroupRecord,
  IUserGroupStore
} from '../../../store/data';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
/*https://github.com/yuyang041060120/ng2-validation*/
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.css']
})
export class AccountPageComponent implements OnInit {

  @select(['data','users']) users$: Observable<IUserStoreRecord>
  @select(['data', 'userGroups']) userGroups$: Observable<IUserGroupStore>

  public ownedGroups$: Observable<IUserGroupRecord[]>;
  public memberGroups$: Observable<IUserGroupRecord[]>;

  public form: FormGroup;
  private sub: Subscription;

  constructor(
     private fb: FormBuilder,
     private sessionService: SessionService,
     private nilmService: NilmService,
     private userGroupService: UserGroupService
  ) { 
    this.ownedGroups$ = this.userGroups$.map(store =>{
       return store.owner.map(id => store.entities[id]);
    });
    this.memberGroups$ = this.userGroups$.map(store =>{
       return store.member.map(id => store.entities[id]);
    });
    
  }

  ngOnInit() {
    this.sub = this.users$.subscribe(
      users =>{
        if(users.current!=null && 
           users.entities[users.current]!==undefined){
          this.buildForm(users.entities[users.current]);
        }
      });
    this.userGroupService.loadUserGroups();
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  buildForm(user: IUserRecord) {
    this.form = this.fb.group({
      first_name: [user.first_name, Validators.required],
      last_name: [user.last_name, Validators.required],
      email: [user.email, [Validators.required,CustomValidators.email]],
      passwords: this.fb.group({
        password: [""],
        password_confirmation: [""],
      },{validator: this.passwordValidator}),
      current_password: ["",Validators.required]
    });
  }

  passwordValidator(group: FormGroup){
    const password = group.get('password');
    const confirm = group.get('password_confirmation');
    if(password.value === confirm.value){
      return null; //ok
    }
    return {
      areEqual: false
    }
  }
  onSubmit(formValues: any){
    const userParams = {
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      current_password: formValues.current_password,
      password: formValues.passwords.password,
      password_confirmation: formValues.passwords.password_confirmation
    }
    this.sessionService.updateAccount(userParams);
  }

}
