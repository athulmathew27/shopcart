import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  provider: any;
  facebookProvider :any;
  user : any;
  email1 :string = "";
  password1 :string = "";
  constructor(private authService : AuthService,
              private fireAuth : AngularFireAuth,
              private router : Router,
              private firestore : AngularFirestore) { }

  ngOnInit(): void {
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().onAuthStateChanged(user=> {
      this.user = user;
      if(user){
        this.router.navigate(['products/list'])
      }
    });
  }


  signin(formData){
    this.email1 = formData.emailid;
    this.password1 = formData.pass;
    this.fireAuth.signInWithEmailAndPassword(this.email1,this.password1)
    .then(res =>{
      localStorage.setItem('user',JSON.stringify(res.user));
      window.location.reload();
      this.router.navigate(['/products/list'])
    })
 }

 createUserViaGoogle(){
  firebase.auth().signInWithPopup(this.provider).then(result=> {
    var user = result.user;
    if(user){
      localStorage.setItem('user',JSON.stringify(user));
      window.location.reload();
    }
  })
  // .catch(function(error) {
  //   console.log(error.message);
  // });
 }


 createUserViaFacebook(){
  this.facebookProvider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(this.facebookProvider).then((result)=> {
    var user = result.user;
    if(user){
      localStorage.setItem('user',JSON.stringify(user));
      window.location.reload();
    }
  })
  .catch((error)=> {
    console.log(error);
  });
 }

}
