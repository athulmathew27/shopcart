import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  category : Observable<any[]>;
  constructor( private firestore: AngularFirestore ) {
    this.category = firestore.collection('category').valueChanges();
    console.log(this.category);
  }

  ngOnInit(): void {  }
  getValue(data)
  {
    console.warn(data);
    this.firestore.collection('products').add({ name: data.name, category: data.category , price : data.price , image : data.image});
  }

}
