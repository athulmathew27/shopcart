import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/products/models/products.model';
import { Myorders } from 'src/app/products/models/my-orders.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements  OnInit {

  orderData : Myorders[] = [];
  dataSource  = [];
  totNum : number;
  displayColumn : string[] = ['index','product','category','quantity','amount','payment','address','date','status'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  filterVal : number;
  filterArg : string ="";
  searchBy : string = "";
  date : number[] = [];


  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {

    var i = 0;
    this.firestore.collection('orders').ref.get().then((querysnap)=>{
      querysnap.forEach(doc=>{
        this.firestore.collection('users').doc(doc.data().userId).collection('myorders').doc(doc.data().orderId).ref.get()
        .then((myorderData)=>{
            this.orderData.push(myorderData.data())
            this.isLoadingResults=false;
            this.resultsLength = this.orderData.length;
            this.date.push(this.orderData[i].date.seconds*1000)
            i++;
        })
      })
      // this.dataSource = new MatTableDataSource(this.orderData)
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    })

  }



  filterByPreference(filterOn){
    this.filterArg = filterOn;
  }

  resetTable(){
    this.filterArg = "";
    this.searchBy = "";
  }
  searchInTable(searchBy){
    this.searchBy = searchBy;
  }
}
