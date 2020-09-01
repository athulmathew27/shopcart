import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { environment} from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { CategoryModule } from './category/category.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  entryComponents : [ProductAddComponent],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    AppRoutingModule,
    ProductsModule,
    BrowserAnimationsModule,
    NgbModule,
    CategoryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
