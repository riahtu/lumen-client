/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditStreamComponent } from './edit-stream.component';

describe('EditStreamComponent', () => {
  let component: EditStreamComponent;
  let fixture: ComponentFixture<EditStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
