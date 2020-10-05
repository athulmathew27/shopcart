
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(public fireAuth : AngularFireAuth) {  }

  async signin(email, password){
    await this.fireAuth.signInWithEmailAndPassword(email,password)
    .then(res =>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  async signup(email, password){
    await this.fireAuth.createUserWithEmailAndPassword(email,password)
    .then(res =>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  logout(){
    // console.log("xxxxxxxxxxxxxxxxxxxx")
    // this.fireAuth.signOut()
    // localStorage.removeItem('user');
    // this.isLoggedIn = false
  }
}
