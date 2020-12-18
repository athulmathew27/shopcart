import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyorderFull } from '../../models/myorder-full.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-track-order-detail',
  templateUrl: './track-order-detail.component.html',
  styleUrls: ['./track-order-detail.component.scss']
})
export class TrackOrderDetailComponent implements OnInit, OnChanges {

  @Input() productDetails : MyorderFull
  user : any;
  status : string;
  statusData : any;
  currentStep: number = 0;
  constructor(private firstore : AngularFirestore) { }

  parentFunction(data){
    this.productDetails = data
  }

  ngOnInit(): void {}

  ngOnChanges(changes :SimpleChanges){
    if(changes.productDetails.currentValue){
      this.statusData = this.productDetails;
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
    }
  }
}
