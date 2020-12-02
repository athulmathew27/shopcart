import { Injectable } from '@angular/core';
import { Product } from '../models/products.model'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore,
              private storage :AngularFireStorage) { }

  addNewProduct(productData : Product, image :any){
    var filepath = `productImages/${image.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filepath);
    this.storage.upload(filepath, image).snapshotChanges().pipe(
    finalize(()=>{
      fileRef.getDownloadURL().subscribe((imgUrl)=>{
        productData.image = imgUrl
        this.firestore.collection<Product>('products').add(productData).then(()=>alert("New Product Added")).catch(err=>console.log(err))
      })
    })
    ).subscribe()

    // this.firestore.collection<Product>('products').add(productData).then(docRef=>{
    //   var filepath = `productImages/${docRef.id}/${image.name}_${new Date().getTime()}`;
    //   const fileRef = this.storage.ref(filepath);
    //   this.storage.upload(filepath, image).snapshotChanges().pipe(
    //     finalize(()=>{
    //       fileRef.getDownloadURL().subscribe((url)=>{
    //         console.log(url);
    //       })
    //     })
    //   ).subscribe()
    // })
  }

  showProducts() : Observable<Product[]>
  {
    return this.firestore.collection<Product>('products').valueChanges({ idField: 'productId' });
  }
}
