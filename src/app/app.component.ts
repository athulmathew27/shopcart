import { importExpr } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit} from '@angular/core';
import { AuthService } from './auth.service';
import { LoginComponent } from './auth/components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shopcart';
  isLoggedIn = false;
  loginSignUpToggle : string;

  constructor(public authService : AuthService){}
  ngOnInit(): void {
    if(localStorage.getItem('user')!== null){
      this.isLoggedIn = true;
      console.log(this.isLoggedIn)
    }
    else{
      this.isLoggedIn = false;
    }
  }
}
