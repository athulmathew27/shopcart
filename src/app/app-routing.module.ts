import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component' ;

const routes: Routes = [
  {
    path: '', redirectTo: '/products/list', pathMatch: 'full'
  },
  {
    path:'products',
    loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)
  },
  {
    path:'category',
    loadChildren:()=>import('./category/category.module').then(m=>m.CategoryModule)
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
