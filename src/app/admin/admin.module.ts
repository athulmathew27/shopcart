import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component'

import { AdminRoutingModule } from './admin-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { DateFilterPipe } from './pipes/date-filter.pipe';




@NgModule({
  declarations: [AdminHomeComponent, ViewOrdersComponent, FilterPipe, SearchPipe, FilterComponent, DateFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class AdminModule { }
