import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/products.model';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnChanges {

  @Input() productData : Product;
  product : Product;
  favColorActive = false;
  favProductsID = [];
  favProductCount : number;
  user : any;

  constructor(private router : Router,
              private firestore : AngularFirestore,
              private snack : MatSnackBar) { }

  ngOnInit(): void { }

  ngOnChanges(changes : SimpleChanges){
    this.favouriteColor();
    if(changes.productData.currentValue){
      this.product = changes.productData.currentValue;
    }
  }

  showProduct(product : Product, productID : string)
  {
       this.router.navigate(['products/product',productID,  product.name,  product.categoryName, product.image, product.price, product.stock]);
  }

  favouriteColor()
  {
    var user = firebase.auth().currentUser;
    if(user)
    {
      this.firestore.collection('users').doc(user.uid).collection('favourite').valueChanges()
      .subscribe(val=>{
        for(let i = 0; i < val.length; i++)
        {
          this.favProductCount = val.length;
          if(!this.favProductsID.includes(val[i].productID)){
            this.favProductsID.push(val[i].productID);
          }
        }
      })
    }
  }

  addToFavourite(e, product)
  {
    this.favProductsID.push(product.productId);
    e.stopPropagation();
    var user = firebase.auth().currentUser;
    if(user)
    {
      this.user = user;
      this.firestore.collection('users').doc(this.user.uid).collection('favourite', ref => ref.where('productID', '==', product.productId)).valueChanges()
      .subscribe(val=>{
          if(val.length > 0){
            this.snack.open('Added To Wishlist', 'close',{
              duration: 3000
            });
          }
          else{
            this.firestore.collection('users').doc(this.user.uid).collection('favourite').add({productID : product.productId})
            .then(()=>{
              this.snack.open('Added To Wishlist', 'close',{
                duration: 3000
              });
            }).catch(err=>{
              console.log(err)
            })
          }
        })
    }
  }

  removeFromFavourite(e, product)
  {
    e.stopPropagation();
    const index = this.favProductsID.indexOf(product.productId);
    if (index > -1) {
      this.favProductsID.splice(index, 1);
    }
    var user = firebase.auth().currentUser;
    if(user)
    {
      this.user = user;
      this.firestore.collection('users').doc(this.user.uid).collection('favourite', ref => ref.where('productID', '==', product.productId)).valueChanges({idField : 'fav-doc-id'})
      .subscribe(val=>{
          let docId = val[0]["fav-doc-id"]
          this.firestore.collection('users').doc(this.user.uid).collection('favourite').doc(docId).delete().then(()=>{
            this.snack.open('Removed', 'close',{
              duration: 3000
            });
          })
          .catch(err=>{
            console.log(err)
          })
      })
    }
  }

  addToCart(productID : string, quantity : number){
    var user = firebase.auth().currentUser;
    if (user) {
      this.user = user;
      this.firestore.collection('users').doc(this.user.uid).collection('cart').add({productID : productID, quantity : 1}).then(()=>{
        alert("Added to cart");
      })
    }
    else{
      alert("Please Login ...")
    }
  }

}
