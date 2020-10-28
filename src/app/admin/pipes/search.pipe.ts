import { Pipe, PipeTransform } from '@angular/core';
import { MyorderFull } from 'src/app/products/models/myorder-full.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  filteredData :MyorderFull = []
  transform(value: MyorderFull[], searchBy: string): unknown {
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
