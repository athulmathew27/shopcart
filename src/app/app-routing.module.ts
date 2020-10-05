import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { from } from 'rxjs';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component' ;
import { AngularFireAuthGuard, AngularFireAuthGuardModule, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
  {
    path: '', redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path:'products',
    loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule),
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirectUnauthorizedToLogin}
  },
  {
    path:'category',
    loadChildren:()=>import('./category/category.module').then(m=>m.CategoryModule),
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirectUnauthorizedToLogin}
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy : PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
