import { Pipe, PipeTransform } from '@angular/core';
import { ReviewFull } from '../models/review.model';

@Pipe({
  name: 'review'
})
export class ReviewPipe implements PipeTransform {

  filteredData :ReviewFull[] = [];
  transform(reviews: ReviewFull[], category: string): unknown {
    if(reviews){
      if(category){
        if(category == "positive"){
          this.filteredData = [];
          for (let i = 0; i < reviews.length; i++) {
            if(reviews[i].rating > 2){
              this.filteredData.push(reviews[i]);
            }
          }
          return this.filteredData
        }
        if("negative"){
          this.filteredData = [];
          for (let i = 0; i < reviews.length; i++) {
            if(reviews[i].rating <= 2){
              this.filteredData.push(reviews[i]);
            }
          }
          return this.filteredData
        }
      }
      return reviews
    }
    return null;
  }

}
