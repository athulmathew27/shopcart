import { Action } from '@ngrx/store';
import { Product } from '../../models/products.model';

export const LIST_PRODUCTS = '[Products] List Products';
export const LIST_PRODUCTS_SUCCESS = '[Products] List Products Success';
export const LIST_PRODUCTS_FAILURE = '[Products] List Products Failure';

export const ADD_PRODUCT = '[Products] Add Product';
export const ADD_PRODUCT_SUCCESS = '[Products] Add Product Success';
export const ADD_PRODUCT_FAILURE = '[Products] Add Product Failure';

//Load Products
export class ListProducts implements Action {
  readonly type = LIST_PRODUCTS;
}

export class ListProductsSuccess implements Action {
  readonly type = LIST_PRODUCTS_SUCCESS;
  constructor(public payload : Product[]){}
}

export class ListProductsFailure implements Action {
  readonly type = LIST_PRODUCTS_FAILURE;
  constructor(public payload : string){}
}

//Add Products
export class AddProducts implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload : Product){}
}

export class AddProductsSuccess implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;
  constructor(public payload : Product){}
}

export class AddProductsFailure implements Action {
  readonly type = ADD_PRODUCT_FAILURE;
  constructor(public payload : string){}
}


export type ProductsAction =
| ListProducts
| ListProductsSuccess
| ListProductsFailure
| AddProducts
| AddProductsFailure
| AddProductsSuccess;
