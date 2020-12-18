import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { RatingComponent } from './components/rating/rating.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';

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
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RatingModule } from 'ngx-bootstrap/rating';

import { StoreModule } from '@ngrx/store';
import * as fromProduct from './store/reducers/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffect } from './store/effects/products.effects';
import { CartComponent } from './components/cart/cart.component';
import { BillingComponent } from './components/billing/billing.component';
import { DeliveryAddressComponent } from './components/delivery-address/delivery-address.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShowDeliveryAddressComponent } from './components/show-delivery-address/show-delivery-address.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PayUMoneyComponent } from './components/pay-u-money/pay-u-money.component';
import { CashOnDeliveryComponent } from './components/cash-on-delivery/cash-on-delivery.component';
import { TrackOrderComponent } from './components/track-order/track-order.component';
import { TrackOrderDetailComponent } from './components/track-order-detail/track-order-detail.component';
import { TrackMyordersStepperComponent } from './components/track-myorders-stepper/track-myorders-stepper.component';
import { OtherItemsInOrderComponent } from './components/other-items-in-order/other-items-in-order.component';
import { RatingTileComponent } from './components/rating-tile/rating-tile.component';
import { RatingReviewComponent } from './components/rating-review/rating-review.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { CategoryTopListComponent } from './components/category-top-list/category-top-list.component';
import { CategoryBasedFilterPipe } from './pipes/category-based-filter.pipe';


@NgModule({
  declarations: [
    ProductListComponent, // every imported components
    ProductComponent,
    RatingComponent,
    FeedbackFormComponent,
    CartComponent,
    BillingComponent,
    DeliveryAddressComponent,
    FavouriteComponent,
    MyOrdersComponent,
    ProductCardComponent,
    CheckoutComponent,
    ShowDeliveryAddressComponent,
    PaymentComponent,
    PayUMoneyComponent,
    CashOnDeliveryComponent,
    TrackOrderComponent,
    TrackOrderDetailComponent,
    TrackMyordersStepperComponent,
    OtherItemsInOrderComponent,
    RatingTileComponent,
    RatingReviewComponent,
    RatingStarsComponent,
    CategoryTopListComponent,
    CategoryBasedFilterPipe,

  ],
  exports : [
    ProductListComponent, // to fetch <app-product-list> in app.component.html, import it in app.component.ts
    CategoryTopListComponent
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
    MatRadioModule,
    MatChipsModule,
    MatSnackBarModule,
    MatStepperModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatIconModule,
    CarouselModule,
    ButtonsModule,
    RatingModule,
    ProductsRoutingModule,
    // StoreModule.forFeature({ products : fromProduct.productsReducer} ),
    // EffectsModule.forFeature([ProductsEffect]),
  ]
})
export class ProductsModule { }
