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
  ordered :number = 0
  shipped :number = 0;
  nearby :number = 0;
  delivered :number = 0;
  cancelled :number = 0;
  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {  }

  ngOnChanges(changes : SimpleChanges){
    if(changes.orderId.currentValue && changes.user.currentValue && changes.myproductId.currentValue){
      this.firestore.collection('orders').doc(this.orderId).collection('products').doc(this.myproductId).collection('status').ref.get().then(statusSnap=>{
        statusSnap.forEach(statusDoc=>{
          if(statusDoc.data().status == "Order Placed"){
            this.ordered += 1;
          }
          if(statusDoc.data().status == "Shipped"){
            this.shipped += 1;
          }
          if(statusDoc.data().status == "Near By"){
            this.nearby += 1;
          }
          if(statusDoc.data().status == "Delivered"){
            this.delivered += 1;
          }
          if(statusDoc.data().status == "Cancelled"){
            this.cancelled += 1;
          }
        })
      })
    }
  }

  doRating(){
    var ratingEsentialData :RatingEstential = {orderId : this.orderId, productId : this.productId, myproductId : this.myproductId, user : this.user}
    this.callParentFunction.emit(ratingEsentialData);
  }
}

