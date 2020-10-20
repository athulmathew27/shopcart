import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeliveryAddressComponent } from './show-delivery-address.component';

describe('ShowDeliveryAddressComponent', () => {
  let component: ShowDeliveryAddressComponent;
  let fixture: ComponentFixture<ShowDeliveryAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDeliveryAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDeliveryAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
