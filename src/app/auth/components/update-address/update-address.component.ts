import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Address } from 'src/app/products/models/address.model';
import {NgForm} from '@angular/forms'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})
export class UpdateAddressComponent implements OnInit,OnChanges {


  @Input() currentAddress : Address;
  @Input() user :any;
  @Output() parentFunction :EventEmitter<any> = new EventEmitter()
  houseVal:string;
  districtVal:string;
  stateVal:string;
  countryVal:string;
  pincodeVal:any;
  postofficeVal : string;
  addressId :string;
  isEdit :boolean = true;
  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {  }
  ngOnChanges(changes : SimpleChanges){
    if(changes.currentAddress.currentValue){
      this.houseVal = this.currentAddress.address;
      this.districtVal = this.currentAddress.district;
      this.stateVal = this.currentAddress.state;
      this.countryVal = this.currentAddress.country;
      this.pincodeVal = this.currentAddress.pincode;
      this.postofficeVal = this.currentAddress.postoffice;
      this.addressId = this.currentAddress.addressId;
    }
  }

  onAddressSave(data){
    if(this.user.uid && this.currentAddress.addressId){
    this.firestore.collection('users').doc(this.user.uid).collection('address').doc(this.addressId).update(data).then(()=>{
      this.isEdit = false;
      this.parentFunction.emit(false);
    })
    }
  }
  onCancel(){
    this.parentFunction.emit(false);
  }
}
