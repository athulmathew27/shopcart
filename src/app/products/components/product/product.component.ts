import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

 product : string;
 category : string;
 image : string;
 price : number;
 stock : number;
 max :number = 5;
 rate :number = 1;

  productId : string;
  productDetail : Observable<Product>;
  subscription : Subscription;
  constructor(private ActivatedRoute : ActivatedRoute,
              private firestore : AngularFirestore) { }

  ngOnInit(): void {
  //  let product : Product = this.ActivatedRoute.snapshot.paramMap.get('product');
    this.subscription = this.ActivatedRoute.paramMap.subscribe(params =>{
    this.product  = params.get('product');
    this.category = params.get('category');
    this.image = params.get('image');

    this.stock = parseInt(params.get('stock'),10);
    this.price = parseInt(params.get('price'),10);


    })

    // this.firestore.collection<Product>('products').doc(this.productId).ref.get().then(function(doc) {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //     console.log(this.productDetail);
    //   } else {
    //     console.log("No such document!");
    //   }
    // }).catch(function(error) {
    //   console.log("Error getting document:", error);
    // });


  }



  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }
}
