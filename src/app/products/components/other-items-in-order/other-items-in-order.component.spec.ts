import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherItemsInOrderComponent } from './other-items-in-order.component';

describe('OtherItemsInOrderComponent', () => {
  let component: OtherItemsInOrderComponent;
  let fixture: ComponentFixture<OtherItemsInOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherItemsInOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherItemsInOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
