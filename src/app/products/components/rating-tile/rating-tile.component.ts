import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReviewFull } from '../../models/review.model';
@Component({
  selector: 'app-rating-tile',
  templateUrl: './rating-tile.component.html',
  styleUrls: ['./rating-tile.component.scss']
})
export class RatingTileComponent implements OnInit, OnChanges {

  @Input() productId :string;
  ratingList$ : Observable<any>;
  totalReview : number;
  averageRating : number;
  sumRating : number = 0;
  rateTotal : number;
  constructor(private firestore :AngularFirestore) { }

  ngOnInit(): void {  }
  ngOnChanges(changes :SimpleChanges){
    if(changes.productId.currentValue){
      this.firestore.collection<ReviewFull>('products').doc(this.productId).collection('rating').valueChanges().subscribe(
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
}
