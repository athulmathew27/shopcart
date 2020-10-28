import { Component, Input, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Myorders,Myproducts} from '../../models/my-orders.model';
import { OrderStatus} from '../../models/order-status.model';
import * as firebase from 'firebase';

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
  address :string;
  user : any;
  myOrderID :string = "";
  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    if(user){
      this.user = user;
    }
    else{
      alert("o")
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
  delivaryAddress : delivaryAddress
  }

  this.firestore.collection('users').doc(this.user.uid).collection('myorders').add(orderData).then(myorderDocRef=>{
    this.myOrderID = myorderDocRef.id;
    for(let i =0; i<this.cartProductId.length;i++){
      this.firestore.collection('products').doc(this.cartProductId[i]).ref.get().then(productsDocRef=>{
        if(productsDocRef.exists){
          let currentStock =  productsDocRef.data().stock;
          let updatedStock = currentStock - this.cartQuantity[i];
          var myproductsData : Myproducts = {
            productID : this.cartProductId[i],
            quantity : this.cartQuantity[i],
            product : productsDocRef.data().name,
            category : productsDocRef.data().categoryName,
            price : productsDocRef.data().price
          }
          this.firestore.collection('products').doc(this.cartProductId[i]).update({stock : updatedStock})
          this.firestore.collection('users').doc(this.user.uid).collection('myorders').doc(this.myOrderID).collection('myproducts').add(myproductsData)
          this.firestore.collection('users').doc(this.user.uid).collection('cart').doc(this.cartId[i]).delete()
           // })
          //})
        }
      })
    }
  }).then(()=>{
    var date = new Date();
    var statusData :OrderStatus= {
      orderPlacedTime : date,
      shippedTime : null,
      nearByTime : null,
      deliveredTime : null
    }
    this.firestore.collection('orders').add({userId : this.user.uid, orderId : this.myOrderID }).then(()=>{
    this.firestore.collection('users').doc(this.user.uid).collection('myorders').doc(this.myOrderID).collection('status').add(statusData)
    window.location.reload()
    })
  })


}

}
