import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../models/products.model';
import * as firebase from 'firebase';
import { Cart } from '../../models/cart.model';
import { Myorders } from '../../models/my-orders.model';
import { Address } from '../../models/address.model';
import { CodService } from '../../services/cod.service';
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
  // address : Address = [];
  address : any = [];


  @Input() paymentDetails;
  @Input() selectedAddress;
  @Output() completeStep2 :EventEmitter<any> = new EventEmitter()
  paymentType = ""
  constructor(private firestore : AngularFirestore,
              private codService : CodService) { }

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

pay(){
  if(this.paymentType == "cod"){
    this.codService.payByCod(this.selectedAddress,this.paymentDetails)
    this.completeStep2.emit("success")
  }
}



}
