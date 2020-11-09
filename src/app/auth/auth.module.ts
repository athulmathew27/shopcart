import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { MatExpansionModule} from '@angular/material/expansion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ManageAddressComponent } from './components/manage-address/manage-address.component';
import { UpdateAddressComponent } from './components/update-address/update-address.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';



@NgModule({
  declarations: [LoginComponent, SignupComponent, ManageUserComponent, ProfileComponent, ManageAddressComponent, UpdateAddressComponent, MyaccountComponent],
  exports: [LoginComponent,SignupComponent,ManageUserComponent, MyaccountComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    BsDropdownModule.forRoot()
  ]
})
export class AuthModule { }
