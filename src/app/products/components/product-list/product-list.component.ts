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
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Observable<Product[]>;

  constructor(private firestore: AngularFirestore,
              private dialog: MatDialog,
              private productService : ProductsService,
              private store : Store<fromApp.AppState>,
              private router : Router
              )  {  }

  ngOnInit(): void {
      this.listProducts();
   }


  addProduct()
  {
      const dialogRef = this.dialog.open(ProductAddComponent);
  }

  listProducts()
  {

    //this.store.pipe(select('products').subscribe(arg => this.productList = arg.products));


       this.productList = this.productService.showProducts();
      // this.store.dispatch(new fromProductAction.ListProducts())
      //    this.store.select('products').subscribe(
      //   productState => this.productList = productState.products
      // );

  }

  showProduct(product : Product)
  {
       this.router.navigate(['products/product',  product.name,  product.categoryName, product.image, product.price, product.stock]);
  }
}
