import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Rating } from '../../models/rating.model';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  rate : number = 1;
  max : number = 5;

  constructor(@Inject(MAT_DIALOG_DATA) public data : string,
              private firestore : AngularFirestore,) { }
  ngOnInit(): void {

   }


  onRating(review : NgForm){
    this.firestore.collection<Rating>('product_rating').add({productID : this.data.productID, review : review.value.reviewContent , rating : this.rate})
  }

}
