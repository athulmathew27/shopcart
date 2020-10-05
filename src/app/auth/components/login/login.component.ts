import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  provider: any;
  user : any;
  constructor(private authService : AuthService,
              private fireAuth : AngularFireAuth,
              private router : Router,
              private firestore : AngularFirestore) { }

  ngOnInit(): void {
    this.provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged(user=> {
      this.user = user;
      if(user){
        this.router.navigate(['products/list'])
      }
    });
  }


  signin(email, password){
    this.fireAuth.signInWithEmailAndPassword(email,password)
    .then(res =>{
      localStorage.setItem('user',JSON.stringify(res.user));
      window.location.reload();
      this.router.navigate(['/products/list'])
    })
    .catch((err)=>{
      alert(err);
    })
 }

 createUserViaGoogle(){
  firebase.auth().signInWithPopup(this.provider).then(result=> {
    var user = result.user;
    this.firestore.collection('users').doc(user.uid).set({displayName : user.email, image : "null"}).then(
      ()=>{
        localStorage.setItem('user',JSON.stringify(user));
        window.location.reload();
      }).catch(err=>{
        alert(err);
      })
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });

 }

}
