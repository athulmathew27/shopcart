import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators} from '@angular/forms';

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

//validation
  addProductForm = new FormGroup({
    name : new FormControl('',[Validators.required,Validators.minLength(2)]),
    category:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    image:new FormControl('',Validators.required),
  })
  get name(){return this.addProductForm.get('name')}
  get price(){return this.addProductForm.get('price')}
  get image(){return this.addProductForm.get('image')}

//add product to firestore
  getValue(data)
  {
    console.warn(data);
    this.firestore.collection('products').add({ name: data.name, category: data.category , price : data.price , image : data.image});
  }

}
