import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ProductAddComponent } from '../product-add/product-add.component';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { Store } from '@ngrx/store';
import * as fromProductAction from '../../store/actions/products.action';
import * as fromApp from '../../../app.state';
import { Category } from 'src/app/category/model/category.model';

import * as firebase from 'firebase';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Observable<Product[]>;
  product;
  // favouriteColor : Observable<Product[]>
  user : any;
  userData : any;
  favColorActive = false;
  favProductsID = [];

  constructor(private firestore: AngularFirestore,
              private dialog: MatDialog,
              private productService : ProductsService,
              private store : Store<fromApp.AppState>,
              private router : Router
              )  {  }

  ngOnInit(): void {
      this.listProducts();
      this.favouriteColor();
   }


  addProduct()
  {
      const dialogRef = this.dialog.open(ProductAddComponent);
  }

  listProducts()
  {
     this.productList = this.productService.showProducts();

    //  this.store.dispatch(new fromProductAction.ListProducts())
    //  this.store.subscribe(state =>(
    //    this.product = state.products.products
    //  ))
  }

  showProduct(product : Product, productID : string)
  {
       this.router.navigate(['products/product',productID,  product.name,  product.categoryName, product.image, product.price, product.stock]);
  }

  addToFavourite(product)
  {
    var user = firebase.auth().currentUser;
    if(user)
    {
      this.user = user;
      this.firestore.collection('users').doc(this.user.uid).collection('favourite', ref => ref.where('productID', '==', product.productId)).valueChanges()
      .subscribe(val=>{
          if(val.length > 0){
            alert('already added to favourie')
          }
          else{
            this.firestore.collection('users').doc(this.user.uid).collection('favourite').add({productID : product.productId})
            .then(()=>{
              alert("Added to favourite");
            }).catch(err=>{
              alert(err)
            })
          }
        })
    }
  }

  removeFromFavourite(product)
  {
    console.log(product)
    var user = firebase.auth().currentUser;
    if(user)
    {
      this.userData = user;
      this.firestore.collection('users').doc(user.uid).collection('favourite', ref => ref.where('productID', '==', product.productId)).valueChanges({idField : 'fav-doc-id'})
      .subscribe(val=>{
          let docId = val[0]["fav-doc-id"];
          this.firestore.collection('users').doc(this.user.uid).collection('favourite').doc(docId).delete();
          window.location.reload()
      })
    }
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
          this.favProductsID.push(val[i].productID);
        }
      })
    }
  }


}
