import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotTabComponent } from './plot-tab.component';

describe('PlotTabComponent', () => {
  let component: PlotTabComponent;
  let fixture: ComponentFixture<PlotTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
