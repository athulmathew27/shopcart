import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayUMoneyComponent } from './pay-u-money.component';

describe('PayUMoneyComponent', () => {
  let component: PayUMoneyComponent;
  let fixture: ComponentFixture<PayUMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayUMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayUMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
