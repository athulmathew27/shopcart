import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase';

import { Address } from '../../models/address.model';
import { DeliveryAddressComponent } from '../delivery-address/delivery-address.component';

@Component({
  selector: 'app-show-delivery-address',
  templateUrl: './show-delivery-address.component.html',
  styleUrls: ['./show-delivery-address.component.scss']
})
export class ShowDeliveryAddressComponent implements OnInit {

  user : any;
  address$ : Address[];
  addressSelected = "";

  @Output() callParent = new EventEmitter<string>();

  constructor(  private dialog : MatDialog,
                private firestore : AngularFirestore) { }

  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    if(user){
      this.user = user;
      this.address$ = this.firestore.collection('users').doc(this.user.uid).collection<Address>('address').valueChanges({idField : 'addressId'})
    }
   }

  addNewAddress(){
    this.dialog.open(DeliveryAddressComponent);
  }

  selectDeliveryAddress(addressSelected : string){
    this.callParent.emit(addressSelected)
  }

}
