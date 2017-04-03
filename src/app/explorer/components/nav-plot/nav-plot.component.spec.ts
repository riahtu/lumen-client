import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPlotComponent } from './nav-plot.component';

describe('NavPlotComponent', () => {
  let component: NavPlotComponent;
  let fixture: ComponentFixture<NavPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
