import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoryAddComponent } from '../../components/category-add/category-add.component';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../model/category.model';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories : Observable<Category[]>;
  displayColumn : string[] = ['index','category_name']; //for MatTable

  constructor(private firestore : AngularFirestore,
              private dialog : MatDialog)
  {
     this.categories = firestore.collection<Category>('category').valueChanges({ idField: 'categoryId' });
  }
  ngOnInit(): void {  }

  addCategory(){
    this.dialog.open(CategoryAddComponent);
  }
}
