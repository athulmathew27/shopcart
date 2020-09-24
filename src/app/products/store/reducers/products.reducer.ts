import { Product } from '../../models/products.model';
import * as fromProductsAction from '../actions/products.action';
import { Action } from '@ngrx/store';

export interface ProductState {
  products : Product[];
  error : string;
}
export const initialState : ProductState={
  products : [],
  error : undefined
}
export function productsReducer(state : ProductState = initialState,
                                action : fromProductsAction.ProductsAction){
    switch(action.type){

//LIST PRODUCTS
      case fromProductsAction.LIST_PRODUCTS:
        return {
          ...state,
          // loading: true,
        };
      case fromProductsAction.LIST_PRODUCTS_SUCCESS:
        return {
          ...state,
          products : [action.payload],
        };
      case fromProductsAction.LIST_PRODUCTS_FAILURE:
        return {
          ...state,
          error : [action.payload],
        };


//ADD PRODUCTS
      case fromProductsAction.ADD_PRODUCT:
        return {
            ...state,
        };
      case fromProductsAction.ADD_PRODUCT_SUCCESS:
        return {
          ...state,
          products : [...state.products, action.payload]
        };
      case fromProductsAction.ADD_PRODUCT_FAILURE:
          return {
            ...state,
            error : [action.payload]
          };
      default:
        return state;
    }
}
