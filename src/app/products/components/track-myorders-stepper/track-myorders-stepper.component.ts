
import { Component, Input, OnInit , VERSION, ViewChild,AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import { OrderStatus } from '../../models/order-status.model';
import { MatStepper } from '@angular/material/stepper';
import { AngularFirestore } from '@angular/fire/firestore';
import { Myorders } from '../../models/my-orders.model';

@Component({
  selector: 'app-track-myorders-stepper',
  templateUrl: './track-myorders-stepper.component.html',
  styleUrls: ['./track-myorders-stepper.component.scss']
})
export class TrackMyordersStepperComponent implements OnInit, AfterViewInit,OnChanges {

  private ngVersion: string = VERSION.full;
  @Input() statusData
  @Input() currentProcess : number;
  isLinear = true;
  isEditable = false;
  process: Boolean;
  steps = [ "Ordered", "Shipped", 'Near By', "Delivered" ];
  currentStep : number = 0

  ordered: number = 0;
  shipped: number = 0;
  nearby: number = 0;
  delivered: number = 0;
  cancelled: number = 0;
  orderStatus :OrderStatus[] = []
  shippedStatus :OrderStatus[] = []
  nearbyStatus :OrderStatus[] = []
  deliveredStatus :OrderStatus[] = []
  cancelledStatus :OrderStatus[] = []

  // name = 'Progress Bar';
  // //Demo purpose only, Data might come from Api calls/service
  // public counts = ["Order Placed","Shipped","Near By","Delivered"];
  // public orderStatus = ""

  @ViewChild('stepper') stepper: MatStepper;
  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void { }
  ngAfterViewInit(){
    this.process = true;
    // setTimeout(() => {
    //   this.currentStep = this.currentProcess;
    //   this.process = false;
    // }, 1500);
  }

  ngOnChanges(changes : SimpleChanges){
    if(changes.statusData.currentValue){
    this.process = true;
    this.firestore.collection('orders').doc(this.statusData.orderId).collection('products').doc(this.statusData.myproductId).collection<OrderStatus>('status').ref.get().then(statusSnap=>{
      statusSnap.forEach(statusDoc=>{
        var obj = {
          location :statusDoc.data().location,
          status :statusDoc.data().status,
          time :statusDoc.data().time,
          text :statusDoc.data().text,
      }
        if(statusDoc.data().status == "Order Placed"){
          this.ordered += 1;
          this.orderStatus.push(obj)
        }
        if(statusDoc.data().status == "Shipped"){
          this.shipped += 1;
          this.shippedStatus.push(obj);
        }
        if(statusDoc.data().status == "Near By"){
          this.nearby += 1;
          this.nearbyStatus.push(obj);
        }
        if(statusDoc.data().status == "Delivered"){
          this.delivered += 1;
          this.deliveredStatus.push(obj);
        }
        if(statusDoc.data().status == "Cancelled"){
          this.cancelled += 1;
          this.cancelledStatus.push(obj);
        }
      })
      this.findCurrentStep();
    })
    // setTimeout(() => {
    //   this.currentStep = this.currentProcess;
    //   this.process = false;
    // }, 1500);
    }
  }

  findCurrentStep(){
    if(this.ordered > 0 && this.shipped == 0 && this.cancelled == 0){
      this.currentStep = 1
    }
    if(this.shipped > 0 && this.nearby == 0 && this.cancelled == 0){
      this.currentStep = 2
    }
    if(this.nearby > 0 && this.delivered == 0 && this.cancelled == 0){
      this.currentStep = 3
    }
    if(this.delivered > 0 && this.cancelled == 0){
      this.currentStep = 4
    }
  }
}
