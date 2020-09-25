import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';


const routes: Routes = [
{
  path:'list',
  component: ProductListComponent
},
{
  path: 'product/:id/:product/:category/:image/:price/:stock',
   component: ProductComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
