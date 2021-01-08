import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyorderFull } from '../../models/myorder-full.model';
import * as firebase from 'firebase';
import { OrderStatus } from '../../models/order-status.model';
import * as moment from 'moment';
@Component({
  selector: 'app-track-order-detail',
  templateUrl: './track-order-detail.component.html',
  styleUrls: ['./track-order-detail.component.scss']
})
export class TrackOrderDetailComponent implements OnInit, OnChanges {

  @Input() productDetails : MyorderFull;
  statusData : MyorderFull;
  currentStep: number = 0;
  IsReturnable :boolean = false;
  returnPage :boolean = false;
  // ordered: number = 0;
  // shipped: number = 0;
  // nearby: number = 0;
  // delivered: number = 0;
  // cancelled: number = 0;
  // orderStatus :OrderStatus[] = []
  // shippedStatus :OrderStatus[] = []
  // nearbyStatus :OrderStatus[] = []
  // deliveredStatus :OrderStatus[] = []
  // cancelledStatus :OrderStatus[] = []
  constructor(private firestore : AngularFirestore) { }

  parentFunction(data){
    this.productDetails = data
  }

  ngOnInit(): void {}

  ngOnChanges(changes :SimpleChanges){
    if(changes.productDetails.currentValue){
      this.statusData = this.productDetails;
      var dates = [];
      this.firestore.collection('returns', ref => ref.where('myProductId', '==', this.statusData.myproductId)).valueChanges().subscribe(snap=>{
        if(snap.length <= 0){
          this.firestore.collection('orders').doc(this.statusData.orderId).collection('products').doc(this.statusData.myproductId).collection('status').ref.get().then(statusSnap=>{
            statusSnap.forEach(statusDoc=>{
              if(statusDoc.data().status == "Cancelled"){
                dates.push(statusDoc.data().time.seconds*1000)
              }
            });
            var sorted = dates.sort((a,b)=>a-b);
            if(moment().format('MMM DD, YYYY') <= moment(sorted[0]).add(7, 'days').format('MMM DD, YYYY')){
              this.IsReturnable = true;
            }
          });
        }
      })

      //     console.log(statusDoc.data())
      //     if(statusDoc.data().status == "Order Placed"){
      //       this.ordered += 1;
      //       this.orderStatus.push(statusDoc.data())
      //     }
      //     if(statusDoc.data().status == "Shipped"){
      //       this.shipped += 1;
      //       this.shippedStatus.push(statusDoc.data())
      //     }
      //     if(statusDoc.data().status == "Near By"){
      //       this.nearby += 1;
      //       this.nearbyStatus.push(statusDoc.data())
      //     }
      //     if(statusDoc.data().status == "Delivered"){
      //       this.delivered += 1;
      //       this.deliveredStatus.push(statusDoc.data())
      //     }
      //     if(statusDoc.data().status == "Cancelled"){
      //       this.cancelled += 1;
      //       this.cancelledStatus.push(statusDoc.data())
      //     }
      //   })
      // })
    }
  }
  showReturnPage(){
    this.returnPage = true;
  }
  backToOrderPage(event){
    this.returnPage = false;
  }
  backToOrderPage2(event){
    this.returnPage = false;
    this.IsReturnable = false;
  }
}
