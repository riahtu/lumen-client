import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NilmAdminComponent } from './nilm-admin.component';

describe('NilmAdminComponent', () => {
  let component: NilmAdminComponent;
  let fixture: ComponentFixture<NilmAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NilmAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NilmAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
