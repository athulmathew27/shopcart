import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Category } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import * as fromApp from '../../../app.state';
import * as fromCategoryAction from '../../store/category.action';
@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  constructor(private firestore: AngularFirestore,
              private categoryService : CategoryService,
              private store : Store<fromApp.AppState>) { }
  ngOnInit(): void {  }
  onCategorySave(categoryData : Category)
  {
    this.store.dispatch(new fromCategoryAction.AddCategory(categoryData))
    //this.categoryService.addCategory(categoryData)
   // this.firestore.collection('category').add(CategoryItem);
  }
}
