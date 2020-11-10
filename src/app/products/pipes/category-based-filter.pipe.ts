import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/products.model';

@Pipe({
  name: 'categoryBasedFilter'
})
export class CategoryBasedFilterPipe implements PipeTransform {

  filteredData :Product[] = [];
  filteredDataTemp :Product[] = [];

  transform(value: Product[], args: string): unknown {
    if(!args){
      this.filteredData = [];
      this.filteredDataTemp = [];
      return value
    }
    else{
      if(args == 'all'){
        this.filteredData = [];
        this.filteredDataTemp = [];
        return value;
      }
      this.filteredData = []
      for(let i = 0; i < value.length; i++){
        if(value[i].categoryName == args){
          this.filteredData.push(value[i])
        }
      }
      return this.filteredData
    }
    return null;
  }

}
