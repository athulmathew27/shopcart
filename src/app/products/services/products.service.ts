import { Injectable } from '@angular/core';
import { Product } from '../models/products.model'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private firestore: AngularFirestore) { }

  addNewProduct(productData : Product){
    return this.firestore.collection<Product>('products').add(productData);
  }

  showProducts() : Observable<Product[]>
  {
    return this.firestore.collection<Product>('products').valueChanges({ idField: 'productId' });
  }
}
