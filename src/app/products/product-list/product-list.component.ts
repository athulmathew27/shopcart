import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { CategoryAddComponent } from 'src/app/category/category-add/category-add.component';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productdata: Observable<any[]>;
  constructor(firestore: AngularFirestore,  public dialog: MatDialog ) {
    this.productdata = firestore.collection('products').valueChanges();


  }
  ngOnInit(): void {  }
  addProduct(){
    const dialogRef = this.dialog.open(ProductAddComponent);
  }
  addCategory(){
    const dialogRef = this.dialog.open(CategoryAddComponent);
  }
}
