import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNilmsComponent } from './edit-nilms.component';

describe('EditNilmsComponent', () => {
  let component: EditNilmsComponent;
  let fixture: ComponentFixture<EditNilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
