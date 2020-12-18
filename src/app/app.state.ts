import { ActionReducerMap } from '@ngrx/store';

import * as fromProductList from './products/store/reducers/products.reducer';


export interface AppState {
  readonly products : fromProductList.ProductState,
}


export const appReducer: ActionReducerMap<AppState> = {
  products: fromProductList.productsReducer,
};
