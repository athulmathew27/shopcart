import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/products.model';
import * as firebase from 'firebase';
import { Cart } from '../../models/cart.model';
import { Myorders } from '../../models/my-orders.model';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnChanges {

  step : number = -1;
  payAmt : number;
  cartProductId : string[];
  cartQuantity : number[];
  cartId : string[];
  user : any;
  address : Address = [];


  @Input() paymentDetails;
  @Input() selectedAddress;

  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    this.user = user;
  }

  ngOnChanges(changes : SimpleChanges){
      if(changes.paymentDetails.currentValue && changes.selectedAddress){
        this.payAmt = this.paymentDetails.toPay
        this.cartProductId = this.paymentDetails.cartProductId
        this.cartQuantity = this.paymentDetails.cartQuantity
        this.cartId = this.paymentDetails.cartId;

        this.address = this.selectedAddress
      }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }



  updateProduct(){
    console.log("xxx")
  }


}
