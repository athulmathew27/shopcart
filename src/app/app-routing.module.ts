import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'products',
  loadChildren:()=>import('./products/products.module').then(mode=>mode.ProductsModule)
  },
  {path:'category',
  loadChildren:()=>import('./category/category.module').then(mode=>mode.CategoryModule)
  },
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
