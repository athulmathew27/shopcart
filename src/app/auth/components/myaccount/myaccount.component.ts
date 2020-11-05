import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  constructor(
    private fireAuth : AngularFireAuth,
    private router : Router) { }

  ngOnInit(): void {
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
