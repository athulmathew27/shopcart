import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { ProductsService } from '../../services/products.service';
import * as fromProductAction from '../actions/products.action';
import { ProductsAction, ListProducts,AddProducts } from '../actions/products.action';
import { Product } from '../../models/products.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable()
export class ProductsEffect {

 @Effect() ListProducts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromProductAction.LIST_PRODUCTS),
      switchMap((data: fromProductAction.ListProducts) =>
      this.firestore.collection<Product>('products').valueChanges()//{ idField: 'productId' }
          .pipe(
            map((products : Product[]) => [
              new fromProductAction.ListProductsSuccess(products)
            ]),
            catchError((err) => {
              return of(new fromProductAction.ListProductsFailure(err));
            })
          )
      )
    );
  });

  @Effect() AddProducts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromProductAction.ADD_PRODUCT),
      switchMap((data: fromProductAction.AddProducts) =>
       this.firestore.collection<Product>('products').add(data.payload)
          .pipe(
            switchMap((products : Product) => [
              new fromProductAction.AddProductsSuccess(products)
            ]),
            catchError((err) => {
              return of(new fromProductAction.AddProductsFailure(err));
            })
          )
      )
    );
  });


  constructor (private action$ : Actions,
              private productService : ProductsService,
              private firestore : AngularFirestore){}
}
