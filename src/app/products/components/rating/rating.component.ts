import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, validateEventsArray } from '@angular/fire/firestore';
import { from, Observable, Subject } from 'rxjs';
import { Rating } from '../../models/rating.model';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  maxTotal : number = 5;
  rateTotal : number = 1;
  ratingList$ : Observable<any>;
  totalReview : number;
  averageRating : number;
  sumRating : number = 0;

  @Input() productID : string;


  constructor(private firestore : AngularFirestore) {

   }
  ngOnInit(): void {

    this.ratingList$ = this.firestore.collection<Rating>('product_rating', ref => ref.where('productID', '==', this.productID)).valueChanges();

    // this.firestore.collection<Rating>('product_rating', ref => ref.where('productID', '==', this.productID)).valueChanges().subscribe(
    //   val=> {
    //      this.totalReview = val.length
    // });

    this.firestore.collection<Rating>('product_rating', ref => ref.where('productID', '==', this.productID)).valueChanges().subscribe(
      val=> {
        this.totalReview = val.length;
        if(this.totalReview < 1){
          this.rateTotal = 0;
        }
        else{
          for (var i=0;i<val.length;i++){
            if(val[i].rating != null){
              this.sumRating = this.sumRating + val[i].rating;
            }
        }
          this.averageRating = this.sumRating / this.totalReview;
          this.rateTotal = parseFloat(this.averageRating.toFixed(1));
      }
    });
  }
}
