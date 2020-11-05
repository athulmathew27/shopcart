import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user :any;
  displayName :string = "";
  email :string = "";
  phoneNumber :any;
  constructor() { }
  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        this.user = user;
        this.displayName = user.displayName;
        this.email = user.email;
        if(user.phoneNumber != null){
          this.phoneNumber = user.phoneNumber;
        }
      }
    })
  }
  onSubmit(formValue){
    this.user.updateProfile({
      displayName : formValue.fname,

      email : formValue.emailid
    })
    this.user.updatePhoneNumberCredential({phoneNumber :formValue.number,})
  }


}
