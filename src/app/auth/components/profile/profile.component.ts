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
  firstname :string = "";
  email :string = "";
  phoneNumber :any = 8921733544;
  lastname :string ="";
  constructor() { }
  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        this.user = user;
        var arr = user.displayName.split(" ");
        this.firstname = arr[0];
        if(arr.length > 1){
          this.lastname = arr[1];
        }
        this.email = user.email;
        if(user.phoneNumber != null){
          this.phoneNumber = user.phoneNumber;
        }
      }
    })
  }
  onSubmit(formValue){
    var name = ""
    if(formValue.lname && formValue.fname){
      name = formValue.fname.trim() +" "+ formValue.lname.trim();
    }
    else{
      name = formValue.fname;
    }
    this.user.updateProfile({displayName : name, email : formValue.emailid})
  }


}
