import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  ratingListTemp : ReviewFull[] = [];
  totalReview : number;
  averageRating : number;
  sumRating : number = 0;
  showMore :number = 3;

  @Input() productID : string;
  @Output() showRatingDetail :EventEmitter<any> = new EventEmitter();

  constructor(private firestore : AngularFirestore) {}
  ngOnInit(): void {}
  ngOnChanges(changes : SimpleChanges)
  {
    this.firestore.collection('products').doc(this.productID).collection('rating').ref.get().then((snap)=>{
      snap.forEach(ratingDoc=>{
        var ratingData :any = {
          description: ratingDoc.data().description,
          displayName: ratingDoc.data().displayName,
          // myproductId: ratingDoc.data().myproductId,
          // orderId: ratingDoc.data().orderId,
          // productId: ratingDoc.data().productId,
          rating: ratingDoc.data().rating,
          title: ratingDoc.data().title,
          // userId: ratingDoc.data().userId,
        }
        this.ratingList.push(ratingData)
      })
    }).then(()=>{
      this.totalReview = this.ratingList.length;
      this.showLessReview();
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
      this.showLessReview();
    })
  }

  showAll(){
    this.showRatingDetail.emit(this.ratingList);
  }
  showMoreReview(){
    this.showMore = this.showMore + 3;
    var len = 0;
    this.ratingListTemp = [];
    if(this.ratingList.length < this.showMore){
      len = this.ratingList.length;
      this.showMore = this.ratingList.length;
    }
    else{
      len = this.showMore;
    }
    for (let i = 0; i < len; i++) {
      this.ratingListTemp.push(this.ratingList[i])
    }
  }
  showLessReview(){
    var len = 0;
    this.ratingListTemp = [];
    this.showMore = 3
    if(this.ratingList.length < 3){
      len = this.ratingList.length;
      this.showMore = this.ratingList.length;
    }
    else{
      len = 3;
    }
    for (let i = 0; i < len; i++) {
      this.ratingListTemp.push(this.ratingList[i])
    }
  }
}
