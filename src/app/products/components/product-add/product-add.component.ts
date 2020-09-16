import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.state';
import  * as fromProductAction from '../../store/actions/products.action';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  category : Observable<any[]>;
  constructor( private firestore: AngularFirestore,
               private productService : ProductsService,
               private store : Store<fromApp.AppState>
               )
  {
    this.category = firestore.collection('category').valueChanges();
    console.log(this.category);
  }
  ngOnInit(): void {  }

//validation
  addProductForm = new FormGroup({
    name : new FormControl('',[Validators.required,Validators.minLength(2)]),
    category:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    stock: new FormControl('',Validators.required),
    image:new FormControl('',Validators.required),
  })
  get name(){return this.addProductForm.get('name')}
  get price(){return this.addProductForm.get('price')}
  get stock(){return this.addProductForm.get('stock')}
  get image(){return this.addProductForm.get('image')}

//add product to firestore
  onProductSave(productData : Product)
  {
      // this.productService.addNewProduct(productData);
      this.store.dispatch(new fromProductAction.AddProducts(productData))
  }

}
