/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditDbComponent } from './edit-db.component';

describe('EditDbComponent', () => {
  let component: EditDbComponent;
  let fixture: ComponentFixture<EditDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
