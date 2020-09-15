
import { ActionReducerMap } from '@ngrx/store';
import { from } from 'rxjs';

import * as fromProductList from './products/store/reducers/products.reducer';
import * as fromCategoryList from './category/store/category.reducer';


export interface AppState {
  readonly products : fromProductList.ProductState,
  readonly category : fromCategoryList.CategoryState
}


export const appReducer: ActionReducerMap<AppState> = {
  products: fromProductList.productsReducer,
  category: fromCategoryList.categoryReducer
};
