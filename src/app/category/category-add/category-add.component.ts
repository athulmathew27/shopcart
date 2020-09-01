import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
// import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }
  ngOnInit(): void {  }
getValue(data : NgForm)
{
  this.firestore.collection('category').add({ name: data.value.name});

}
}
