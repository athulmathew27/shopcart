import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReviewFull } from '../../models/review.model';

@Component({
  selector: 'app-rating-detail',
  templateUrl: './rating-detail.component.html',
  styleUrls: ['./rating-detail.component.scss']
})
export class RatingDetailComponent implements OnInit {

  @Input() ratingList : ReviewFull[] = [];
  @Output() OnBackToDetailPage :EventEmitter<any> = new EventEmitter();
  category :string;
  constructor() { }

  ngOnInit(): void {  }

  onBack(){
    this.OnBackToDetailPage.emit("false")
  }
  onFilter(cat){
    this.category = cat;
  }
}
