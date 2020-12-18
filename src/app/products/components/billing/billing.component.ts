import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Address } from '../../models/address.model';
import { Cart } from '../../models/cart.model';
import { Product } from '../../models/products.model';
import { CheckoutComponent } from '../checkout/checkout.component';
import { DeliveryAddressComponent } from '../delivery-address/delivery-address.component';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit, OnChanges {

  @Input() billingData

  userData : any;
  totalitems : number;
  toPay : number = 0;

  products : [];
  quantity : [];
  cartProductId : [];
  cartId : [];
  address$ : Observable<Address[]>;
  addressSelected : string;
  constructor(private firestore : AngularFirestore,
              private dialog : MatDialog,
            ) { }

  ngOnInit(): void {  }

  ngOnChanges(changes : SimpleChanges){
      setTimeout(()=>{
         this.totalitems = this.billingData.product.length
         this.products = this.billingData.product
         this.quantity = this.billingData.quantity
         this.cartProductId = this.billingData.cartProductId
         this.cartId = this.billingData.cartId
         var total = 0;
        for(let i = 0; i < this.totalitems; i++){
          total = total + (this.billingData.product[i].price * this.billingData.quantity[i])
        }
        this.toPay = total
      },2000)
  }

  onCheckOut(){
    this.dialog.open(CheckoutComponent,{data:{toPay : this.toPay,cartQuantity : this.quantity, cartProductId : this.cartProductId, cartId : this.cartId}})
  }


}
