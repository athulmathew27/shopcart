import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyorderFull } from '../../models/myorder-full.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-track-order-detail',
  templateUrl: './track-order-detail.component.html',
  styleUrls: ['./track-order-detail.component.scss']
})
export class TrackOrderDetailComponent implements OnInit {

  @Input() productDetails : MyorderFull
  user : any;
  status : string;
  statusData : any;
  currentStep: number = 0;
  constructor(private firstore : AngularFirestore) { }

  parentFunction(data){
    this.productDetails = data
  }

  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    if(user){
      this.user = user;
      this.firstore.collection('users').doc(this.user.uid).collection('myorders').doc(this.productDetails.orderId).collection('status').ref.get().then((statusSnap)=>{
        statusSnap.forEach(statusDoc=>{
          this.statusData = statusDoc.data();
          if(this.statusData.orderPlacedTime != null && this.statusData.shippedTime == null && this.statusData.nearByTime == null && this.statusData.deliveredTime == null){
            this.status = "Order Placed";
            this.currentStep = 1;
          }
          else if(this.statusData.orderPlacedTime != null && this.statusData.shippedTime != null && this.statusData.nearByTime == null && this.statusData.deliveredTime == null){
            this.status = "Shipped";
            this.currentStep = 2;
          }
          else if(this.statusData.orderPlacedTime != null && this.statusData.shippedTime != null && this.statusData.nearByTime != null && this.statusData.deliveredTime == null){
            this.status = "Near By";
            this.currentStep = 3;
          }
          else if(this.statusData.orderPlacedTime != null && this.statusData.shippedTime != null && this.statusData.nearByTime != null && this.statusData.deliveredTime != null){
            this.status = "Delivered";
            this.currentStep = 4;
          }
        })
      })
    }
  }

}
