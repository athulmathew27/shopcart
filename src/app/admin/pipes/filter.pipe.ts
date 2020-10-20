import { Pipe, PipeTransform } from '@angular/core';
import { Myorders } from 'src/app/products/models/my-orders.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

   filteredData : Myorders[]= [];
   filteredDataTemp : Myorders[] = [];

  transform(value: Myorders[], filterVal: string): unknown {

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
    if(!filterVal){
      this.filteredData = [];
      this.filteredDataTemp = [];
      return value
    }
    else{
      let today = new Date();
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      let last3days = new Date();
      last3days.setDate(last3days.getDate() - 3)

//cod
        if(filterVal=="paymentTypeCOD") {
        if(this.filteredData.length == 0){
          for(let i = 0; i < value.length; i++){
            if(value[i].paymentType == "COD"){
            this.filteredData.push(value[i])
            }
          }
        }
        else{
          for(let i = 0; i < this.filteredData.length; i++){
            if(this.filteredData[i].paymentType == "COD"){
            this.filteredDataTemp.push(this.filteredData[i])
            }
          }
          this.filteredData = this.filteredDataTemp;
        }
        }
//net bank

else if(filterVal=="paymentTypeNetBank") {
  if(this.filteredData.length == 0){
    for(let i = 0; i < value.length; i++){
      if(value[i].paymentType == "Net Banking"){
      this.filteredData.push(value[i])
      }
    }
  }
  else{
    for(let i = 0; i < this.filteredData.length; i++){
      if(this.filteredData[i].paymentType == "Net Banking"){
      this.filteredDataTemp.push(this.filteredData[i])
      }
    }
    this.filteredData = this.filteredDataTemp;
  }
  }

// order placed

else if(filterVal=="OrderPlaced") {

  if(this.filteredData.length == 0){
    for(let i = 0; i < value.length; i++){
      if(value[i].status == "Order Placed"){
      this.filteredData.push(value[i])
      }
    }
  }
  else{
    console.log(this.filteredData)
    for(let i = 0; i < this.filteredData.length; i++){
      if(this.filteredData[i].status == "Order Placed"){
      this.filteredDataTemp.push(this.filteredData[i])
      }
    }
    this.filteredData = this.filteredDataTemp;
  }
  }

//order deliverd

else if(filterVal=="OrderDelivered") {

  if(this.filteredData.length == 0){
    for(let i = 0; i < value.length; i++){
      if(value[i].status == "Delivered"){
      this.filteredData.push(value[i])
      }
    }
  }
  else{
    console.log(this.filteredData)
    for(let i = 0; i < this.filteredData.length; i++){
      if(this.filteredData[i].status == "Delivered"){
      this.filteredDataTemp.push(this.filteredData[i])
      }
    }
    this.filteredData = this.filteredDataTemp;
  }
  }

  // order processing

  else if(filterVal=="OrderProcessing") {

    if(this.filteredData.length == 0){
      for(let i = 0; i < value.length; i++){
        if(value[i].status == "Processing"){
        this.filteredData.push(value[i])
        }
      }
    }
    else{
      console.log(this.filteredData)
      for(let i = 0; i < this.filteredData.length; i++){
        if(this.filteredData[i].status == "Processing"){
        this.filteredDataTemp.push(this.filteredData[i])
        }
      }
      this.filteredData = this.filteredDataTemp;
    }
    }
// date today

else if(filterVal=="dateToday") {

  if(this.filteredData.length == 0){
    for(let i = 0; i < value.length; i++){
      let date = value[i].date.seconds*1000
      const newDate = new Date(date);
      if(today.getDate() == newDate.getDate() && today.getMonth() == newDate.getMonth() && today.getFullYear() == newDate.getFullYear()) {
        this.filteredData.push(value[i])
      }
    }
  }
  else{
    console.log(this.filteredData)
    for(let i = 0; i < this.filteredData.length; i++){
      let date = this.filteredData[i].date.seconds*1000
      const newDate = new Date(date);
      if(today.getDate() == newDate.getDate() && today.getMonth() == newDate.getMonth() && today.getFullYear() == newDate.getFullYear()) {
        this.filteredDataTemp.push(this.filteredData[i])
      }
    }
    this.filteredData = this.filteredDataTemp;
  }
  }

  // date yesterday

  else if(filterVal=="dateYesterday") {

    if(this.filteredData.length == 0){
      for(let i = 0; i < value.length; i++){
        let date = value[i].date.seconds*1000
        const newDate = new Date(date);
        if(yesterday.getDate() == newDate.getDate() && yesterday.getMonth() == newDate.getMonth() && yesterday.getFullYear() == newDate.getFullYear()) {
          this.filteredData.push(value[i])
        }
      }
    }
    else{
      for(let i = 0; i < this.filteredData.length; i++){
        let date = this.filteredData[i].date.seconds*1000
        const newDate = new Date(date);
        if(yesterday.getDate() == newDate.getDate() && yesterday.getMonth() == newDate.getMonth() && yesterday.getFullYear() == newDate.getFullYear()) {
          this.filteredDataTemp.push(this.filteredData[i])
        }
      }
      this.filteredData = this.filteredDataTemp;
    }
    }
    //date last 3 days
    else if(filterVal=="date3days") {

      if(this.filteredData.length == 0){
        for(let i = 0; i < value.length; i++){
          let date = value[i].date.seconds*1000
          const newDate = new Date(date);
          if(last3days.getDate() <= newDate.getDate() && last3days.getMonth() <= newDate.getMonth() && last3days.getFullYear() <= newDate.getFullYear()) {
            this.filteredData.push(value[i])
          }
        }
      }
      else{
        for(let i = 0; i < this.filteredData.length; i++){
          let date = this.filteredData[i].date.seconds*1000
          const newDate = new Date(date);
          if(last3days.getDate() <= newDate.getDate() && last3days.getMonth() <= newDate.getMonth() && last3days.getFullYear() <= newDate.getFullYear()) {
            this.filteredDataTemp.push(this.filteredData[i])
          }
        }
        this.filteredData = this.filteredDataTemp;
      }
      }
      //


        // else if(filterVal=="dateBefore3days"){
        //   let date = value[i].date.seconds*1000
        //   const newDate = new Date(date);
        //   if(last3days.getDate() < newDate.getDate() && last3days.getMonth() >= newDate.getMonth() && last3days.getFullYear() >= newDate.getFullYear()) {
        //     this.filteredData.push(value[i])
        //   }
        // }

        else{
          return value;
        }

    }


    return this.filteredData;
  }

}
