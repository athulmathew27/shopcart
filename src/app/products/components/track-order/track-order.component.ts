import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderStatus } from '../../models/order-status.model';
import { RatingEstential } from '../../models/rating-esential.model';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit, OnChanges {

  @Input() orderId : string;
  @Input() user  :any;
  @Input() myproductId : string;
  @Input() productId :string;

  @Output() callParentFunction :EventEmitter<any> = new EventEmitter();

  status : string = null;
  statusData : OrderStatus;
  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {  }

  ngOnChanges(changes : SimpleChanges){
    if(changes.orderId.currentValue && changes.user.currentValue && changes.myproductId.currentValue){
      this.firestore.collection('users').doc(this.user.uid).collection('myorders').doc(this.orderId).collection('myproducts').doc(this.myproductId).collection('status').ref.get().then((querySnap)=>{
        querySnap.forEach(doc => {
          this.statusData = doc.data();
          // var orderData = {
          //   deliveredTime: doc.data().deliveredTime,
          //   nearByTime: doc.data().nearByTime,
          //   orderPlacedTime: doc.data().shippedTime,
          //   shippedTime: doc.data().shippedTime,
          // }
          // this.statusData = orderData;
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

  doRating(){
    var ratingEsentialData :RatingEstential = {orderId : this.orderId, productId : this.productId, myproductId : this.myproductId, user : this.user}
    this.callParentFunction.emit(ratingEsentialData);
  }
}

