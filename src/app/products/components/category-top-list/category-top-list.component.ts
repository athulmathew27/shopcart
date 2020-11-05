import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from 'src/app/category/model/category.model';

@Component({
  selector: 'app-category-top-list',
  templateUrl: './category-top-list.component.html',
  styleUrls: ['./category-top-list.component.scss']
})
export class CategoryTopListComponent implements OnInit {

  category$ :Observable<any[]>
  @Output() callParentFunction :EventEmitter<any> = new EventEmitter();
  constructor(private firestore :AngularFirestore) { }

  ngOnInit(): void {
    this.category$ = this.firestore.collection('category').valueChanges()
  }
  selectItem(name){
    this.callParentFunction.emit(name);
  }
}
