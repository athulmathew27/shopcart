import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Product } from '../../models/products.model';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

 productID : string;
 product : string;
 category : string;
 image : string;
 price : number;
 stock : number;
 max :number = 5;
 rate :number = 1;
  //productId : string;
  similerProducts : Observable<Product[]>;
  subscription : Subscription;
  userData : any;
  constructor(private ActivatedRoute : ActivatedRoute,
              private dialog : MatDialog,
              private firestore : AngularFirestore,
              private router : Router,
              private snack : MatSnackBar) { }

  ngOnInit(): void {

 //  let product : Product = this.ActivatedRoute.snapshot.paramMap.get('product');
    this.subscription = this.ActivatedRoute.paramMap.subscribe(params =>{
      this.productID = params.get('id');
      this.product  = params.get('product');
      this.category = params.get('category');
      this.image = params.get('image');
      this.stock = parseInt(params.get('stock'),10);
      this.price = parseInt(params.get('price'),10);
    })

    this.similerProducts = this.firestore.collection<Product>('products',
        ref => ref.where('categoryName', '==', this.category))
              .valueChanges({idField: 'productId'});
  }


  showProduct(product : Product, productID : string){
      this.router.navigate(['products/product',productID,  product.name,  product.categoryName, product.image, product.price, product.stock]);
  }

  addToCart(productID : string, quantity : number){
    var user = firebase.auth().currentUser;
    if (user) {
      this.userData = user;
      if(this.stock > quantity){
        this.firestore.collection('users').doc(this.userData.uid).collection('cart', ref => ref.where('productID', '==', productID)).valueChanges()
        .subscribe(val=>{
          if(val.length == 0){
             this.firestore.collection('users').doc(this.userData.uid).collection('cart').add({productID : productID, quantity : quantity})
          }
          else{
            this.snack.open('Already added to cart', 'close',{
              duration: 3000
            });
          }
        })
       }
       else{
        this.snack.open("Sorry we don't have required stock. Please choose a lesser quantity", 'close',{
          duration: 3000
        });
       }
    }
    else{
       alert("Please Login ...");
    }
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }
}
