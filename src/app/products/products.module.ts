import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductComponent } from './components/product/product.component';
import { RatingComponent } from './components/rating/rating.component';

import { ProductsRoutingModule } from './products-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RatingModule } from 'ngx-bootstrap/rating';

import { StoreModule } from '@ngrx/store';
import * as fromProduct from './store/reducers/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffect } from './store/effects/products.effects';


@NgModule({
  declarations: [
    ProductListComponent, // every imported components
    ProductAddComponent, ProductComponent, RatingComponent,

  ],
  exports : [
    ProductListComponent // to fetch <app-product-list> in app.component.html, import it in app.component.ts
  ],
  imports: [
    CommonModule, // every imported modules
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    // BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatChipsModule,
    CarouselModule,
    RatingModule,
    ProductsRoutingModule,
    // StoreModule.forFeature({ products : fromProduct.productsReducer} ),
    // EffectsModule.forFeature([ProductsEffect]),
  ]
})
export class ProductsModule { }
