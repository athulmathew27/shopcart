import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import * as fromProductAction from '../../store/actions/products.action';
import * as fromApp from '../../../app.state';
import { Category } from '../../models/category.model';
import { ProductSearchService } from '../../services/product-search.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList:Product[];
  filteredList :Product[] =[];
  categoryName :string;
  constructor(private dialog: MatDialog,
              private productService : ProductsService,
              private store : Store<fromApp.AppState>,
              private productSearchService :ProductSearchService
              )  {  }

  ngOnInit(): void {
      this.listProducts();
      this.productSearchService.share.subscribe(data =>{
        this.productList = [];
        this.productList = data;
      })
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
