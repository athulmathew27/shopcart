import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { AuthModule } from '../auth/auth.module';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../products/models/products.model';
import { ProductSearchService } from '../products/services/product-search.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  showManageUser : boolean = false;
  showProductListPage : boolean = false;
  productList :Product[] = [];
  filteredProductList :Product[] = [];
  cartItemCount :number = 0;
  userId :string;
  showClearTextButton :boolean = false;
  searchValue :string = "";
  constructor(private breakpointObserver: BreakpointObserver,
              private authService : AuthService,
              private firestore : AngularFirestore,
              private ProductSearchService :ProductSearchService,
              private router :Router) {}
  ngOnInit() :void {
    this.firestore.collection<Product>('products').valueChanges({ idField: 'productId' }).subscribe(val =>{
      this.productList = val;
    })
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.userId =user.uid;
        this.firestore.collection("users").doc(user.uid).collection("cart").valueChanges().subscribe(val=>{
            this.cartItemCount = val.length;
          })
      } else {
        console.log("No user logined");
      }
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  onSearch(item){
    this.router.navigate(['products/list'])
    if(item){
      this.showClearTextButton = true;
      this.filteredProductList = [];
      for (let i = 0; i < this.productList.length; i++) {
        if(this.productList[i].name.toLowerCase().startsWith(item.toLowerCase())){
          this.filteredProductList.push(this.productList[i])
        }
      }
      this.ProductSearchService.filterProduct(this.filteredProductList)
    }
    else{
      this.showClearTextButton = false
      this.searchValue = ""
      this.ProductSearchService.filterProduct(this.productList)
    }
  }
}
