import { Component, OnInit } from '@angular/core';
import { CustomerDetails } from '../Models/Customer';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showDetails(customerDetails : CustomerDetails) : void {
    console.log("Name: " + customerDetails.name);
    console.log("Email: " + customerDetails.email);
    console.log("Account number: " + customerDetails.accountNumber);
    console.log("Account balance: " + customerDetails.accountBalance);
    console.log("Payment amount: " + customerDetails.paymentAmount);
    console.log("New account balance: " + customerDetails.newAccountBalance);
  }
}
