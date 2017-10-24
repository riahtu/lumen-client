import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisSettingsComponent } from './axis-settings.component';

describe('AxisSettingsComponent', () => {
  let component: AxisSettingsComponent;
  let fixture: ComponentFixture<AxisSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxisSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
