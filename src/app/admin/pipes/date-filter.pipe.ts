import { Pipe, PipeTransform } from '@angular/core';
import { MyorderFull } from 'src/app/products/models/myorder-full.model';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  filteredData : MyorderFull[]= [];
  filteredDataTemp : MyorderFull[] = [];
  transform(value: MyorderFull[], start: string, end :string): unknown {
    if(!start && !end){
      this.filteredData = [];
      this.filteredDataTemp = [];
      return value;
    }
    else{
      this.filteredData = [];
      for(let i = 0; i < value.length; i++){
        let date = value[i].date.seconds*1000;
        if(new Date(date) >= new Date(start) && new Date(date) <= new Date(end)){
          this.filteredData.push(value[i]);
          console.log(this.filteredData);
        }
      }
      return this.filteredData
    }
    return null;
  }

}
