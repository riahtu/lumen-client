import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDataViewComponent } from './load-data-view.component';

describe('LoadDataViewComponent', () => {
  let component: LoadDataViewComponent;
  let fixture: ComponentFixture<LoadDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadDataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
