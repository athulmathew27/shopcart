import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ProductAddComponent } from '../product-add/product-add.component';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import * as fromProductAction from '../../store/actions/products.action';
import * as fromApp from '../../../app.state';
import { Category } from 'src/app/category/model/category.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {

  productList:Product[];
  categoryName :string;
  @Input() filteredProductList :Product[]
  constructor(private dialog: MatDialog,
              private productService : ProductsService,
              private store : Store<fromApp.AppState>,
              )  {  }

  ngOnInit(): void {
      this.listProducts();
   }

  ngOnChanges(changes :SimpleChanges){
    if(changes.filteredProductList.currentValue){
      this.productList = this.filteredProductList;
    }
  }
  parentFunction(data){
    this.categoryName = data;
  }

  listProducts()
  {
     this.productService.showProducts().subscribe(val=>{
      this.productList = val;
     });
    //  this.store.dispatch(new fromProductAction.ListProducts())
    //  this.store.subscribe(state =>(
    //    this.product = state.products.products
    //  ))
  }








}
