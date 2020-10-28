import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderStatus } from '../../models/order-status.model';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit, OnChanges {

  @Input() orderId : string;
  @Input() user  :any;
  status : string = null;
  statusData : OrderStatus;
  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {  }

  ngOnChanges(changes : SimpleChanges){
    if(changes.orderId.currentValue && changes.user.currentValue){
      this.firestore.collection('users').doc(this.user.uid).collection('myorders').doc(this.orderId).collection('status').ref.get().then((querySnap)=>{
        querySnap.forEach(doc => {
          this.statusData = doc.data();
          if(this.statusData.orderPlacedTime != null  && this.statusData.shippedTime ==null && this.statusData.nearByTime == null && this.statusData.deliveredTime == null){
            this.status = "order placed";
          }
          else if(this.statusData.orderPlacedTime !=null && this.statusData.shippedTime !=null && this.statusData.nearByTime == null && this.statusData.deliveredTime == null){
            this.status = "shipped";
          }
          else if(this.statusData.orderPlacedTime !=null && this.statusData.shippedTime !=null && this.statusData.nearByTime != null && this.statusData.deliveredTime == null){
            this.status = "near by";
          }
          else if(this.statusData.orderPlacedTime !=null && this.statusData.shippedTime !=null && this.statusData.nearByTime != null && this.statusData.deliveredTime != null){
            this.status = "delivered";
          }
        });
      })
    }
  }

}

