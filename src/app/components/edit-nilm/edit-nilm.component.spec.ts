import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNilmComponent } from './edit-nilm.component';

describe('EditNilmComponent', () => {
  let component: EditNilmComponent;
  let fixture: ComponentFixture<EditNilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
