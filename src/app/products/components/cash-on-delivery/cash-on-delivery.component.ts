import { Component, Input, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Myorders,Myproducts} from '../../models/my-orders.model';
import { OrderStatus} from '../../models/order-status.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cash-on-delivery',
  templateUrl: './cash-on-delivery.component.html',
  styleUrls: ['./cash-on-delivery.component.css']
})
export class CashOnDeliveryComponent implements OnInit, OnChanges {

  @Input() paymentDetails;
  @Input() selectedAddress;
  payAmt : number;
  cartProductId : string[];
  cartQuantity : number[];
  cartId : string[];
  address :any;
  user : any;
  orderId :string = "";
  myproductId : any = [];
  constructor(private firestore : AngularFirestore,
              private router : Router,
              private dialogRef: MatDialog) { }

  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    if(user){
      this.user = user;
    }
   }
  ngOnChanges(changes : SimpleChanges){
    if(changes.paymentDetails.currentValue && changes.selectedAddress){
      this.payAmt = this.paymentDetails.toPay
      this.cartProductId = this.paymentDetails.cartProductId
      this.cartQuantity = this.paymentDetails.cartQuantity
      this.cartId = this.paymentDetails.cartId;
      this.address = this.selectedAddress
    }
}



onPay(){
  var delivaryAddress = this.address.address + ", "+ this.address.postoffice + ", "+ this.address.district + ", "+ this.address.state + ", "+ this.address.country + ", "+ this.address.pincode;
  var orderData :Myorders = {
    toPay : this.payAmt,
    paymentType : "COD",
    delivaryAddress : delivaryAddress,
    userId : this.user.uid
  }
  this.firestore.collection('orders').add(orderData).then(orderDocref=>{
    this.orderId = orderDocref.id;
    for(let i =0; i<this.cartProductId.length;i++){
      this.firestore.collection('products').doc(this.cartProductId[i]).ref.get().then(productsDocRef=>{
        if(productsDocRef.exists){
          let currentStock =  productsDocRef.data().stock;
          let updatedStock = currentStock - this.cartQuantity[i];
          var date = new Date();
          var myproductsData : Myproducts = {
            productID : this.cartProductId[i],
            quantity : this.cartQuantity[i],
            product : productsDocRef.data().name,
            category : productsDocRef.data().categoryName,
            price : productsDocRef.data().price,
            image : productsDocRef.data().image,
            orderPlacedTime : date,
          }
          this.firestore.collection('products').doc(this.cartProductId[i]).update({stock : updatedStock})
          this.firestore.collection('orders').doc(this.orderId).collection('products').add(myproductsData).then((myProductDoc)=>{
            let status = {
              status : "Order Placed",
              text : "Your order has been placed",
              time : date
            }
            this.firestore.collection('orders').doc(this.orderId).collection('products').doc(myProductDoc.id).collection('status').add(status)
          })
          this.firestore.collection('users').doc(this.user.uid).collection('cart').doc(this.cartId[i]).delete()
        }
      })
    }
  }).then(()=>{
    this.firestore.collection('users').doc(this.user.uid).collection('myorders').add({orderId :this.orderId}).then(()=>{
      this.dialogRef.closeAll();
      this.router.navigate(['/products/myorders']);
    })
  })
}


}
