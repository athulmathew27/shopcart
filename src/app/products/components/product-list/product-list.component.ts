import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { Store } from '@ngrx/store';
import * as fromProductAction from '../../store/actions/products.action';
import * as fromApp from '../../../app.state';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Observable<Product[]>;
  outOfStock : string = "Out Of Stock";
  inStock : string = "IN-STOCK";

  constructor(private firestore: AngularFirestore,
              private dialog: MatDialog,
              private productService : ProductsService,
              private store : Store<fromApp.AppState>,
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
       this.productList = this.productService.showProducts();
      // this.store.dispatch(new fromProductAction.ListProducts())
      //    this.store.select('products').subscribe(
      //   productState => this.productList = productState.products
      // );

  }

  // showProduct(productID)
  // {
  //     alert(productID);
  // }
}
