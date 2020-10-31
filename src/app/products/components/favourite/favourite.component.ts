import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  productList : Observable<any[]>;
  products = [];
  productID = [];
  user : any;
  totItems :number;
  constructor( private firestore : AngularFirestore,
                private router : Router) { }

  ngOnInit(): void {
      var user = firebase.auth().currentUser;
      if(user)
      {
        this.user = user;
        this.firestore.collection('users').doc(user.uid).collection('favourite').valueChanges()
        .subscribe(val =>{
          this.totItems = val.length;
          for(let i = 0; i < val.length; i++)
          {
            this.firestore.collection<Product>('products').doc(val[i].productID).valueChanges()
            .subscribe(products =>{
              this.products.push(products)
              this.productID.push(val[i].productID)
            })
          }
        });

      }
  }


  removeFromFavourite(productId)
  {
    this.firestore.collection('users').doc(this.user.uid).collection('favourite', ref => ref.where('productID', '==', productId)).valueChanges({idField : 'fav-doc-id'})
    .subscribe(val=>{
        let docId = val[0]["fav-doc-id"];
        this.firestore.collection('users').doc(this.user.uid).collection('favourite').doc(docId).delete();
        window.location.reload()
    })
  }

  showProduct(product, productId){
    this.router.navigate(['products/product',productId,  product.name,  product.categoryName, product.image, product.price, product.stock]);
  }

}
