import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerDetails } from 'src/app/Models/Customer';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  cutomerDetails = new CustomerDetails();
  customerForm: FormGroup;
  @Output() dataSaved : EventEmitter<CustomerDetails> = new EventEmitter<CustomerDetails>();

  constructor(private formBuilder: FormBuilder) { 
    this.customerForm = this.formBuilder.group({
      name : ['', Validators.required],
      email: ['', Validators.email],
      accountNumber: [ , [Validators.required]],
      paymentAmount: [ , [Validators.required, Validators.max(this.cutomerDetails.accountBalance)]]
    });
  }

  get Name() {
    return this.customerForm.get('name');
  }
  get Email() {
    return this.customerForm.get('email');
  }
  get AccountNumber() {
    return this.customerForm.get('accountNumber');
  }
  get PaymentAmount() {
    return this.customerForm.get('paymentAmount');
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.cutomerDetails.name = this.Name?.value;
    this.cutomerDetails.email = this.Email?.value;
    this.cutomerDetails.accountNumber = this.AccountNumber?.value;
    this.cutomerDetails.paymentAmount = this.PaymentAmount?.value;
    this.cutomerDetails.newAccountBalance = this.cutomerDetails.accountBalance - this.PaymentAmount?.value;

    this.dataSaved.emit(this.cutomerDetails);
  }
}
