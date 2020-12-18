import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  private content = new BehaviorSubject<Product[]>(null);
  public share = this.content.asObservable();
  constructor() { }

  filterProduct(filteredList){
    this.content.next(filteredList)
  }
}
