import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit, OnChanges {
  @Input() cartItemCount;
  @Input() userId;
  isLoggedIn :boolean = false;
  cartCount :number = 0;
  favCount :number = 0;
  constructor(
    private fireAuth : AngularFireAuth,
    private router : Router,
    private firestore :AngularFirestore) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        this.isLoggedIn = true;
      }
      else{
        this.isLoggedIn = false;
      }
    });
  }
  ngOnChanges(changes :SimpleChanges){
    if(changes){
      if(changes.cartItemCount){
        if(changes.cartItemCount.currentValue){
          this.cartCount = this.cartItemCount;
          this.firestore.collection("users").doc(this.userId).collection("favourite").valueChanges().subscribe(val=>{
            this.favCount = val.length;
          })
        }
      }
    }
  }

  onLogout(){
    this.fireAuth.signOut().then(()=>{
        localStorage.removeItem('user')
        window.location.reload();
        this.router.navigate(['/auth/login'])
      }
    );
  }
  onSignin(){
    this.router.navigate(['/auth/login'])
  }
}
