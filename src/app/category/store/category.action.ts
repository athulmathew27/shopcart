import { Action } from '@ngrx/store';
import { Category } from '../model/category.model';

export const LOAD_CATEGORY = '[Category] Load Category';
export const LOAD_CATEGORY_SUCCESS = '[Category] Load Category Success';
export const LOAD_CATEGORY_FAILURE = '[Category] Load Category Failure';

export const ADD_CATEGORY = '[Category] Add Category';
export const ADD_CATEGORY_SUCCESS = '[Category] Add Category Success';
export const ADD_CATEGORY_FAILURE = '[Category] Add Category Failure';

//load category
export class LoadCategory implements Action {
  readonly type = LOAD_CATEGORY;
}

export class LoadCategorySuccess implements Action {
  readonly type = LOAD_CATEGORY_SUCCESS;
  constructor(public payload : Category[]){}
}

export class LoadCategoryFailure implements Action {
  readonly type = LOAD_CATEGORY_FAILURE;
  constructor(public payload : string){}
}

//add Category
export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;
  constructor(public payload : Category){}
}

export class AddCategorySuccess implements Action {
  readonly type = ADD_CATEGORY_SUCCESS;
  constructor(public payload : Category){}
}

export class AddCategoryFailure implements Action {
  readonly type = ADD_CATEGORY_FAILURE;
  constructor(public payload : string){}
}

export type categoryAction =
| AddCategory
| AddCategorySuccess
| AddCategoryFailure
| LoadCategory
| LoadCategoryFailure
| LoadCategorySuccess
