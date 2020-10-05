import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ManageUserComponent } from './components/manage-user/manage-user.component';



@NgModule({
  declarations: [LoginComponent, SignupComponent, ManageUserComponent],
  exports: [LoginComponent,SignupComponent,ManageUserComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class AuthModule { }
