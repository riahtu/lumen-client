import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotThumbnailComponent } from './plot-thumbnail.component';

describe('PlotThumbnailComponent', () => {
  let component: PlotThumbnailComponent;
  let fixture: ComponentFixture<PlotThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
