import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Myorders,Myproducts } from '../../models/my-orders.model';
import { MyorderFull} from '../../models/myorder-full.model';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  products :MyorderFull[] = [];
  productDetails :MyorderFull = [];
  user : any;
  showOrderDetailPage : boolean = false;

  constructor(private firestore : AngularFirestore,
              private router : Router) { }

  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    if(user){
      this.user = user;
      this.firestore.collection('users').doc(user.uid).collection('myorders')
      .ref.get().then((querySnapshot)=> {
        querySnapshot.forEach((myorderDoc)=> {
          this.firestore.collection('users').doc(user.uid).collection('myorders').doc(myorderDoc.id).collection('myproducts').ref.get().then(myproductsQuerySnap=>{
            myproductsQuerySnap.forEach((myproductsDoc)=>{
              let orderID = { orderId : myorderDoc.id}
              var newObj = Object.assign({}, myproductsDoc.data(), myorderDoc.data(), orderID)
              this.products.push(newObj)
            })
          })
      });
    });
    }
  }

  trackOrderDetail(product){
    this.productDetails = product;
    this.showOrderDetailPage = true;
  }

}
