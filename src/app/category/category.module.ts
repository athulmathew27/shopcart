import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    CategoryAddComponent,
    CategoryListComponent,
  ],
  exports:[CategoryAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    CategoryRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
  ]
})
export class CategoryModule { }
