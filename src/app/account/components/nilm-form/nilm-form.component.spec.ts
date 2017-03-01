import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NilmFormComponent } from './nilm-form.component';

describe('NilmFormComponent', () => {
  let component: NilmFormComponent;
  let fixture: ComponentFixture<NilmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NilmFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NilmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
