import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlottedElementsComponent } from './plotted-elements.component';

describe('PlottedElementsComponent', () => {
  let component: PlottedElementsComponent;
  let fixture: ComponentFixture<PlottedElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlottedElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlottedElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
