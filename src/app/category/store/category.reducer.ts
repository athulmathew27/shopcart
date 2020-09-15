import { from } from 'rxjs';
import { Category } from '../model/category.model';
import * as fromCategoryAction from './category.action';

export interface CategoryState {
  category : Category[],
  error : string
}

const initialState : CategoryState = {
  category : [],
  error : undefined
}

export function categoryReducer(state : CategoryState = initialState,
                action : fromCategoryAction.categoryAction) {

  switch(action.type){
    case fromCategoryAction.LOAD_CATEGORY:
      return{
        ...state
      };
    case fromCategoryAction.ADD_CATEGORY:
      return{
        ...state,
        category : [...state.category, action.payload]
      };
    default:
      return state;
  }
}
