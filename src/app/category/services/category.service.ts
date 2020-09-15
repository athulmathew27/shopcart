import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore : AngularFirestore) { }
addCategory(categoryData : Category)
{
  this.firestore.collection('category').add(categoryData);
}
listCategory()
{

}
}
