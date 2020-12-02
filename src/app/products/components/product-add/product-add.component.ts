import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { Category } from 'src/app/category/model/category.model';
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
  product : Product;
  imgSrc :string;
  selectedImage :string="";
  constructor( private firestore: AngularFirestore,
               private productService : ProductsService,
               private store : Store<fromApp.AppState>,
               )
  {
    this.category = firestore.collection('category').valueChanges();
  }
  ngOnInit(): void {  }

//validation
  addProductForm = new FormGroup({
    name : new FormControl('',[Validators.required,Validators.minLength(2)]),
    category:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    stock: new FormControl('',Validators.required),
    image:new FormControl('',Validators.required),
    color:new FormControl('')
  })
  get name(){return this.addProductForm.get('name')}
  get price(){return this.addProductForm.get('price')}
  get stock(){return this.addProductForm.get('stock')}
  get image(){return this.addProductForm.get('image')}

//add product to firestore
  onProductSave(productData)
  {
    this.product= {
      name : productData.name,
      categoryName : productData.category.name,
      categoryColor : productData.category.color,
      stock : productData.stock,
      price : productData.price,
      image : productData.image
    }
       this.productService.addNewProduct(this.product, this.selectedImage)
     // this.store.dispatch(new fromProductAction.AddProducts(productData))
  }

  imageFetcher(imgEvt :any){
    if(imgEvt.target.files && imgEvt.target){
      this.selectedImage = imgEvt.target.files[0];
    }
  }
}
