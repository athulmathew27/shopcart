import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageAddressComponent } from './components/manage-address/manage-address.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFireAuthGuard, AngularFireAuthGuardModule, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(['/auth/login']);
const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'signup',
     component: SignupComponent
  },
  {
    path: 'profile',
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirectUnauthorizedToLogin},
     component: ProfileComponent
  },
  {
    path: 'manage_address',
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirectUnauthorizedToLogin},
     component: ManageAddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
