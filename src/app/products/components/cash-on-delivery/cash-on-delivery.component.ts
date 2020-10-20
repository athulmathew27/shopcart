import { Component, Input, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  for(let i =0; i<this.cartProductId.length;i++){

    this.firestore.collection('products').doc(this.cartProductId[i]).ref.get().then((doc)=> {
      if (doc.exists) {
        let currentStock =  doc.data().stock;
        let updatedStock = currentStock - this.cartQuantity[i];
        this.firestore.collection('products').doc(this.cartProductId[i]).update({stock : updatedStock})
        .then(()=>{

          var cash = this.cartQuantity[i]*doc.data().price;
          var date = new Date();
          var delivaryAddress = this.address.address + ", "+ this.address.postoffice + ", "+ this.address.district + ", "+ this.address.state + ", "+ this.address.country + ", "+ this.address.pincode;
          var orderData :Myorders = {
            productID : this.cartProductId[i],
            quantity : this.cartQuantity[i],
            status : "Order Placed",
            date : date,
            toPay : cash,
            paymentType : "COD",
            product : doc.data().name,
            category : doc.data().categoryName,
            delivaryAddress : delivaryAddress
          }

          this.firestore.collection('users').doc(this.user.uid).collection('myorders').add(orderData)
          .then((docRef)=>{
            this.firestore.collection('users').doc(this.user.uid).collection('cart').doc(this.cartId[i]).delete()
            .then(()=>{
              this.firestore.collection('orders').add({userId : this.user.uid, orderId : docRef.id })
              .then(()=>{
                window.location.reload();
              })
            })
          })
        })
      }
      else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

  }

}

}
