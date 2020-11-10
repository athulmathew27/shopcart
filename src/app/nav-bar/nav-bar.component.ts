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
  constructor(private breakpointObserver: BreakpointObserver,
              private authService : AuthService,
              private firestore : AngularFirestore) {}
  ngOnInit() :void {
    this.firestore.collection<Product>('products').valueChanges({ idField: 'productId' }).subscribe(val =>{
      this.productList = val;
    })
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  onSearch(item){
    if(item){
      this.showProductListPage = true;
      for (let i = 0; i < this.productList.length; i++) {
        if(this.productList[i].name.startsWith(item)){
          this.filteredProductList.push(this.productList[i])
        }
      }
    }
    else{
      this.showProductListPage = false;
    }
  }
  // onManageUser(){
  //   this.showManageUser = !this.showManageUser;
  // }
}
