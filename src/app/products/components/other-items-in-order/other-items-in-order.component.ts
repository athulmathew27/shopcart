import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyorderFull } from '../../models/myorder-full.model';
import *as firebase from 'firebase';

@Component({
  selector: 'app-other-items-in-order',
  templateUrl: './other-items-in-order.component.html',
  styleUrls: ['./other-items-in-order.component.scss']
})
export class OtherItemsInOrderComponent implements OnInit,OnChanges {

  @Input() productDetails : MyorderFull
  @Output() parentFunction : EventEmitter<any> = new EventEmitter()
  otherProducts : MyorderFull[] = [];
  user : any;
  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {  }
  ngOnChanges(changes : SimpleChanges){
    this.otherProducts = []; //to clear previous data
    var user = firebase.auth().currentUser;
    if(user){
      this.user = user;
    }
    if(changes.productDetails.currentValue){
      this.firestore.collection('users').doc(this.user.uid).collection('myorders').doc(this.productDetails.orderId).ref.get().then(myorderDoc=>{
        this.firestore.collection('users').doc(this.user.uid).collection('myorders').doc(this.productDetails.orderId).collection('myproducts').ref.get().then(myproductsSnap=>{
          myproductsSnap.forEach(myproductDoc=>{
            this.firestore.collection('users').doc(this.user.uid).collection('myorders').doc(this.productDetails.orderId).collection('myproducts').doc(this.productDetails.myproductId).collection('status').ref.get().then(statusSnap=>{
              statusSnap.forEach(statusDoc=>{
                var orderId = {orderId : this.productDetails.orderId};
                var newObj = Object.assign({},myproductDoc.data(), statusDoc.data(), orderId, myorderDoc.data());
                this.otherProducts.push(newObj)
              })
            })
          });
        })
      })


    }
  }

  showOrderStatusDetail(product){
    this.parentFunction.emit(product);
  }

}
