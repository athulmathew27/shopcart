import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { from, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {

  address : string;
  stateValue : string;
  countryValue : string;
  distritValue : string;
  postofficeValue : string;

  user : any;

  constructor( private http : HttpClient,
                private firestore : AngularFirestore) { }

  ngOnInit(): void {  }

  fetchPostofficeDetails(pincode : number)
  {
      this.http.get('https://api.postalpincode.in/pincode/'+pincode).subscribe(
        (res)=>{
                if(res[0].Status === "Success")
                {
                  this.postofficeValue = res[0].PostOffice[0].Name;
                  this.distritValue = res[0].PostOffice[0].District;
                  this.stateValue = res[0].PostOffice[0].State;
                  this.countryValue = res[0].PostOffice[0].Country;
                }
        })
  }
  onAddressSave(address)
  {
    var user = firebase.auth().currentUser;
    if(user)
    {
      this.user = user;
      var addressData : Address= {
        address : address.address,
        pincode : address.pincode,
        postoffice : address.postoffice,
        state : address.state,
        district : address.district,
        country : address.country,
        status : "pending"
      }
      this.firestore.collection('users').doc(this.user.uid).collection<Address>('address').add(addressData)
      .then(()=>{
        alert("address added");
      }).catch(err=>{
        alert(err)
      })
    }

  }

}
