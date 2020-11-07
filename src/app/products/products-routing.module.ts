import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { AngularFireAuthGuard, AngularFireAuthGuardModule, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
{
  path:'list',
  component: ProductListComponent
},
{
  path: 'product/:id/:product/:category/:image/:price/:stock',
   component: ProductComponent
},
{
  path: 'cart',
  canActivate : [AngularFireAuthGuard],
  data : { authGuardPipe : redirectUnauthorizedToLogin},
  component: CartComponent
},
{
  path: 'favourite',
  canActivate : [AngularFireAuthGuard],
  data : { authGuardPipe : redirectUnauthorizedToLogin},
  component : FavouriteComponent
},
{
  path: 'myorders',
  canActivate : [AngularFireAuthGuard],
  data : { authGuardPipe : redirectUnauthorizedToLogin},
  component : MyOrdersComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
