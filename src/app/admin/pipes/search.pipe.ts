import { Pipe, PipeTransform } from '@angular/core';
import { Myorders } from 'src/app/products/models/my-orders.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  filteredData : Myorders[] = []
  transform(value: Myorders[], searchBy: string): unknown {
    if(!searchBy){
      this.filteredData = [];
      return value
    }
    else{
      for (let i = 0; i < value.length; i++) {
        if(value[i].product.startsWith(searchBy)){
          this.filteredData.push(value[i])
        }
      }
      return this.filteredData
    }
    return null
  }

}
