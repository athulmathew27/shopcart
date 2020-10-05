import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cart } from  '../../models/cart.model';
import { Product } from '../../models/products.model';

import * as firebase from 'firebase';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems : Observable<Cart[]>;
  user : any;
  products = []
  cartQuantity = []
  productID = []
  cartID = []
  length ;

  billingdata = []

  constructor(
              private firestore : AngularFirestore
  ) { }

  ngOnInit(): void {

    this.billingdata = [{products : this.products, productID : this.productID, cartID :this.cartID, quantity :this.cartQuantity, length : this.length}];

    var user = firebase.auth().currentUser;
    this.user = user;
    if(user){
      this.firestore.collection('users').doc(this.user.uid).collection('cart').valueChanges({idField : 'cartId'})
      .subscribe(val =>{
        this.length = val.length;
        for(let i = 0; i < this.length; i++)
        {

          this.cartQuantity.push(val[i].quantity)
          this.cartID.push(val[i].cartId)
          this.firestore.collection<Product>('products').doc(val[i].productID).valueChanges()
          .subscribe(products =>{
            this.products.push(products)
            this.productID.push(val[i].productID)
          })
        }
      })
    }
    else{
      alert("Please Login to view cart")
    }


  }

  removeFromCart(cartId : string){
    this.firestore.collection('users').doc(this.user.uid).collection('cart').doc(cartId).delete()
    .then(()=> {
      console.log("Document successfully deleted!");
      window.location.reload()
      }).catch(error =>{
          console.error("Error removing document: ", error);
  });
  }

  updateCart(cartId, quantity, stock){

    if(quantity > stock){
      alert("Required stock is not available, Please try a lower no. ")
    }
    else{
      this.firestore.collection('users').doc(this.user.uid).collection('cart').doc(cartId).update({quantity : quantity})
      .then( ()=>{
                   alert("cart updated");
                   window.location.reload()
      })
      .catch(
        err =>{
               alert(err)
     })
    }
  }
}

