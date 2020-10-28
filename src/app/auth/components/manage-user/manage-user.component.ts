import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion} from '@angular/material/expansion';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  userData$ : Observable<any>;
  name : string;
  editName : boolean = true;
  email : string;
  user : any
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private firestore : AngularFirestore,
              private fireAuth : AngularFireAuth,
              private router : Router) { }

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

  onLogout(){
    this.fireAuth.signOut().then(()=>{
        localStorage.removeItem('user')
        window.location.reload();
        this.router.navigate(['/auth/login'])
      }
    );
}
}
