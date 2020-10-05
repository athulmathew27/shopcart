import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Address } from '../../models/address.model';
import { Cart } from '../../models/cart.model';
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

  products : any;
  quantity : any;
  address$ : Observable<Address[]>;
  addressSelected : string;
  constructor( private firestore : AngularFirestore,
                private dialog : MatDialog,
                ) { }

  ngOnInit(): void {  }

  ngOnChanges(changes : SimpleChanges){
    const billingData1 = changes['billingData']
    if(billingData1){
      console.log(billingData1.currentValue[0].quantity)
      // var user = firebase.auth().currentUser;
      // if(user){
      //   this.userData = user;
      //   this.products = this.billingData[0].products;
      //   this.quantity = this.billingData[0].quantity;

      //  var length = JSON.stringify(this.products).length;
      //  this.totalitems = length

      //  for(let i =0; i < length; i++)
      //  {
      //   console.log("xxxxxxxxxxxxx",this.products);
      //  }
      //   this.address$ = this.firestore.collection('users').doc(this.userData.uid).collection<Address>('address').valueChanges({idField : 'addressID'})
      // }
    }
  }
  addNewAddress(){
    this.dialog.open(DeliveryAddressComponent);
  }
  selectDeliveryAddress(addressSelected){
   // this.firestore.collection('users').doc(this.userData.uid).collection<Address>('address', ref => ref.where('status', '==', "selected"))
    this.firestore.collection('users').doc(this.userData.uid).collection<Address>('address').doc(addressSelected).update({status : "selected"})
  }

}
