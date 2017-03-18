import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPlotComponent } from './main-plot.component';

describe('MainPlotComponent', () => {
  let component: MainPlotComponent;
  let fixture: ComponentFixture<MainPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
