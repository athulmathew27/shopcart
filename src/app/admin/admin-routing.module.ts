import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';

const routes: Routes = [
  {
    path:'home',
    component: AdminHomeComponent
  },
  {
    path:'home/vieworders',
    component: ViewOrdersComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
