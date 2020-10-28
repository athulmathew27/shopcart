import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMyordersStepperComponent } from './track-myorders-stepper.component';

describe('TrackMyordersStepperComponent', () => {
  let component: TrackMyordersStepperComponent;
  let fixture: ComponentFixture<TrackMyordersStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackMyordersStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackMyordersStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
