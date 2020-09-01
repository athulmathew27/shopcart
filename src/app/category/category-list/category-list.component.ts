import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories : Observable<any[]>;
  displayColumn : string[] = ['index','category_name'];

  constructor(private firestore : AngularFirestore, private dialog : MatDialog) {
    this.categories = firestore.collection('category').valueChanges();
   }
  ngOnInit(): void {  }

  addCategory(){
 this.dialog.open(CategoryAddComponent);
  }


}
