import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm} from '@angular/forms';
import { Review,ReviewFull} from '../../models/review.model';

@Component({
  selector: 'app-rating-review',
  templateUrl: './rating-review.component.html',
  styleUrls: ['./rating-review.component.scss']
})
export class RatingReviewComponent implements OnInit, OnChanges {
  @Input() productId : string;
  @Input() orderId : string;
  @Input() myproductId : string
  @Input() user : any;
  @Output() callParentFunToMyorderPage :EventEmitter<any> =new EventEmitter();
  starValue :number = 1;
  displayName1 :string ="";
  description1 :string="";
  title1 :string ="";
  update :boolean = false;
  ratingId :string;
  constructor(private firestore :AngularFirestore) { }

  ngOnInit(): void {}
  ngOnChanges(changes : SimpleChanges){
    if(changes.productId.currentValue && changes.orderId.currentValue && changes.myproductId.currentValue && changes.user.currentValue){
      this.displayName1 = this.user.displayName;
      this.firestore.collection<ReviewFull>('products').doc(this.productId).collection('rating', ref => ref.where('userId', '==', this.user.uid)).ref.get().then((snap)=>{
        snap.forEach((doc)=>{
          if(doc.exists){
            this.update = true;
            this.description1 = doc.data().description;
            this.title1 = doc.data().title;
            this.ratingId = doc.id;
            this.starValue = doc.data().rating;
          }
          else{
            this.update = false;
            this.description1 = "";
            this.title1 = "";
          }
        })
      })
    }
  }

  starCounter(count){
    this.starValue = count;
  }
  onCancel(){
    this.callParentFunToMyorderPage.emit("false");
  }
  onSubmit(data :Review){
    var review :ReviewFull= {
      description : data.description,
      title : data.title,
      displayName : data.displayName,
      rating : this.starValue,
      productId : this.productId,
      myproductId : this.myproductId,
      orderId : this.orderId,
      userId :this.user.uid
    }
    if(this.update){
      this.firestore.collection('products').doc(this.productId).collection('rating').doc(this.ratingId).update(review).then(()=>{
        this.callParentFunToMyorderPage.emit("false");
      }).catch(err=>{
        console.log(err)
      })
    }
    else{
      this.firestore.collection('products').doc(this.productId).collection('rating').add(review).then(()=>{
        this.callParentFunToMyorderPage.emit("false");
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
