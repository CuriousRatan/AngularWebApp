import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerDetails } from '../Models/Customer';

import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showDetails should log customer details to console', function(){
    spyOn(window.console, 'log');
    var mockCustomerDetails = new CustomerDetails();
    component.showDetails(mockCustomerDetails);

    expect(window.console.log).toHaveBeenCalled();
  })
});
