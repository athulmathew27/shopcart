import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, validateEventsArray } from '@angular/fire/firestore';
import { from, Observable, Subject } from 'rxjs';
import { ReviewFull } from '../../models/review.model';
import { Rating } from '../../models/rating.model';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnChanges {

  maxTotal : number = 5;
  rateTotal : number = 1;
  ratingList : ReviewFull[] = [];
  totalReview : number;
  averageRating : number;
  sumRating : number = 0;

  @Input() productID : string;


  constructor(private firestore : AngularFirestore) {}
  ngOnInit(): void {}
  ngOnChanges(changes : SimpleChanges)
  {
    this.firestore.collection('products').doc(this.productID).collection('rating').ref.get().then((snap)=>{
      snap.forEach(ratingDoc=>{
        var ratingData :any = {
          description: ratingDoc.data().description,
          displayName: ratingDoc.data().displayName,
          myproductId: ratingDoc.data().myproductId,
          orderId: ratingDoc.data().orderId,
          productId: ratingDoc.data().productId,
          rating: ratingDoc.data().rating,
          title: ratingDoc.data().title,
          userId: ratingDoc.data().userId,
        }
        this.ratingList.push(ratingData)
      })
    }).then(()=>{
      this.totalReview = this.ratingList.length;
      if(this.totalReview < 1){
        this.rateTotal = 0;
      }
      else{
        for (var i = 0; i < this.totalReview; i++){
          if(this.ratingList[i].rating != null){
            this.sumRating = this.sumRating + this.ratingList[i].rating;
          }
        }
        this.averageRating = this.sumRating / this.totalReview;
        this.rateTotal = parseFloat(this.averageRating.toFixed(1));
      }

    })



  }
}
