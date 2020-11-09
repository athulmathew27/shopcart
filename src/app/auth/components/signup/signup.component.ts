import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  isLoggedIn = false;

  constructor( private authService : AuthService,
              private fireAuth : AngularFireAuth,
              private firestore : AngularFirestore,
              private router : Router) { }

  ngOnInit(): void {  }

  signup(email, password, name){
    this.fireAuth.createUserWithEmailAndPassword(email,password)
    .then(res =>{
      this.firestore.collection('users').doc(res.user.uid).set({displayName : name, image : "null"}).then(function() {
        localStorage.setItem('user',JSON.stringify(res.user));
        window.location.reload();
    }).catch(err =>{
      alert(err)
    });
    })
 }


}
