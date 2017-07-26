import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementResultsComponent } from './measurement-results.component';

describe('MeasurementResultsComponent', () => {
  let component: MeasurementResultsComponent;
  let fixture: ComponentFixture<MeasurementResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
