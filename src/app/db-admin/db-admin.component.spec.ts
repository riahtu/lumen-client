/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DbAdminComponent } from './db-admin.component';
import {} from 'jasmine';

describe('DbAdminComponent', () => {
  let component: DbAdminComponent;
  let fixture: ComponentFixture<DbAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbAdminComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
