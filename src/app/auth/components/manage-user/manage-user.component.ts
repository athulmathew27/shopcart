import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  userData$ : Observable<any>;
  public name : string;
  editName : boolean = true;
  email : string;
  user : any

  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.user = user
        this.name = user.displayName;
        this.email = user.email;
      } else {
        alert("err")
      }
    });
  }

  oneditName(){
    this.editName = false;
  }
  onUpdateName(name){
    this.user.updateProfile({displayName: name}).then(()=> {
        alert("updated")
    }).catch((error)=>{
        alert(error)
    });
  }

}
