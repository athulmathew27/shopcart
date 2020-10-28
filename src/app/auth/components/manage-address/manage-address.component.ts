import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { DeliveryAddressComponent } from 'src/app/products/components/delivery-address/delivery-address.component';
import { Address } from 'src/app/products/models/address.model';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent implements OnInit {

  user : any;
  displayName : string;
  addresses :Observable<Address[]>;
  selectedAddress :Address;
  isEdit : boolean = false;
  constructor(private firestore : AngularFirestore,
              private dialog : MatDialog) { }

  ngOnInit(): void {

    firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        this.user = user;
        this.addresses = this.firestore.collection('users').doc(this.user.uid).collection('address').valueChanges({idField : 'addressId'})
      }
      else{
        console.log("no user found"+user)
      }
  });
}

isEditToggler(data){
  this.isEdit = data;//to false form child => parent (from update address)
}
addNewAddress(){
  this.dialog.open(DeliveryAddressComponent)
}
onEdit(address){
  this.isEdit = !this.isEdit
  this.selectedAddress = address;
}
onDelete(address){
  this.firestore.collection('users').doc(this.user.uid).collection('address').doc(address).delete()
}

}
