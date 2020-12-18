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
  length : number ;

  billingdata;

  constructor(private firestore : AngularFirestore
  ) { }

  ngOnInit(): void {



    var user = firebase.auth().currentUser;
    this.user = user;
    if(user){
      this.firestore.collection('users').doc(this.user.uid).collection<Cart>('cart').valueChanges({idField : 'cartId'})
      .subscribe(val =>{
        this.products = []
        this.productID = []
        this.length = val.length;
        for(let i = 0; i < this.length; i++)
        {

          this.cartQuantity.push(val[i].quantity)
          this.cartID.push(val[i].cartId)
          this.firestore.collection<Product>('products').doc(val[i].productID).ref.get()
          .then(products =>{
            this.products.push(products.data())
            this.productID.push(val[i].productID)
          })
        }
        this.billingdata = {product : this.products, quantity : this.cartQuantity, cartProductId : this.productID, cartId : this.cartID};
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
      // window.location.reload()
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
                  //  window.location.reload()
      })

    }
  }
}

