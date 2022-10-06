import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let formBuilder: FormBuilder;
  let mockAccountBalance = 500;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder); // get a handle on formBuilder
    
    component.customerForm = formBuilder.group({ 
      name: new FormControl("mock", Validators.required),
      email: new FormControl("mock@abc.com", Validators.email),
      accountNumber : new FormControl( 0, Validators.required),
      paymentAmount : new FormControl( 0, [Validators.required, Validators.max(mockAccountBalance)]),
    });

  });

  
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable submit button if all validation succeeds ', () => {
    const compiled = fixture.debugElement.nativeElement;
    const submitBtn = compiled.querySelector("#submitBtn");
    component.customerForm.setValue({
      "name" : "test",
      "email" : "a@a.com",
      "accountNumber" : 1234,
      "paymentAmount" : 100
    });

    fixture.detectChanges();

    expect(component.customerForm.valid).toBeTruthy();
    expect(submitBtn.disabled).toBeFalsy();
  });

  it('should disable submit button if any validation fails ', () => {
    const compiled = fixture.debugElement.nativeElement;
    const submitBtn = compiled.querySelector("#submitBtn");
    component.customerForm.controls['name'].setValue("");

    fixture.detectChanges();

    expect(component.customerForm.valid).toBeFalsy();
    expect(submitBtn.disabled).toBeTruthy();
  });

  it('should invalidate if payment amount is greater than account balance ', () => {
    const compiled = fixture.debugElement.nativeElement;
    const submitBtn = compiled.querySelector("#submitBtn");
    component.customerForm.setValue({
      "name" : "test",
      "email" : "a@a.com",
      "accountNumber" : 1234,
      "paymentAmount" : 510
    });

    fixture.detectChanges();

    expect(component.customerForm.valid).toBeFalsy();
    expect(submitBtn.disabled).toBeTruthy();
  });

  it('should emit the customer details to payment component', () => {
    spyOn(component.dataSaved, 'emit');
    component.customerForm.controls['name'].setValue('test');
    component.onSubmit();

    fixture.detectChanges();
 
    expect(component.customerForm.valid).toBeTruthy();
    expect(component.dataSaved.emit).toHaveBeenCalled();
 });
});
