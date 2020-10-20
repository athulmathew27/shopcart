import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  quantity : number[] = [];
  products : Product[] = [];
  status : string[] = [];

  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    if(user){
      this.firestore.collection('users').doc(user.uid).collection('myorders')
      .ref.get().then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
            // console.log(doc.id, " => ", doc.data());

            this.quantity.push(doc.data().quantity)
            this.status.push(doc.data().status)
            this.firestore.collection('products').doc(doc.data().productID).ref.get().then
            (doc=>{
              if(doc.exists){
                this.products.push(doc.data())
              }
            })
      });
    });
    }
  }

}
