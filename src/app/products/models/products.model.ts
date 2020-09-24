import { Category } from 'src/app/category/model/category.model';

export interface Product{
  name : string,
  categoryName : string,
  categoryColor : string,
  price: number,
  stock : number,
  image : string,
}
