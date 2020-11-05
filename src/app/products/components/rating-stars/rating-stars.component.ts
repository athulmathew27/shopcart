import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RatingModule } from 'ngx-bootstrap/rating';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent implements OnInit, OnChanges {
  @Output() callParentFunctionStar :EventEmitter<any> = new EventEmitter();
  @Input() starCount : number;
  max = 5;
  rate = 1;
  isReadonly = false;
  constructor() { }

  ngOnInit(): void {  }
  ngOnChanges(changes :SimpleChanges){
    if(changes.starCount.currentValue){
      this.rate = this.starCount
    }
  }
  onStarChange(data){
    this.callParentFunctionStar.emit(data)
  }





}
