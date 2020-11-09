import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
  isLoggedIn :boolean = false;
  constructor(
    private fireAuth : AngularFireAuth,
    private router : Router) { }

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
