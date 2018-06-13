/* tslint:disable:no-unused-variable */
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';

import {SessionService } from '../../../services';
import { SignInPageComponent } from './sign-in.page';

describe('SignInPageComponent', () => {
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule],
      declarations: [ SignInPageComponent ],
      providers: [ SessionService, 
                   Http]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([SessionService], 
    (SessionService: SessionService) => {
      expect(component).toBeTruthy();
  }));
});
