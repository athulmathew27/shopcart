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
  otherProducts : any[] = [];
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
      this.firestore.collection('orders').doc(this.productDetails.orderId).ref.get().then((orderDoc)=>{
        var orderData = orderDoc.data()
        var orderId = {orderId :orderDoc.id}
        this.firestore.collection('orders').doc(this.productDetails.orderId).collection('products').ref.get().then((productsSnap)=>{
          productsSnap.forEach(productsDoc=>{
            console.log(productsDoc.data())
            if(productsDoc.data().productID != this.productDetails.myproductId){
              var newObj = Object.assign({},productsDoc.data(), orderId, orderData);
              this.otherProducts.push(newObj)
            }
          })
        })
      })
    }
  }

  showOrderStatusDetail(product){
    this.parentFunction.emit(product);
  }

}
