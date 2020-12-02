import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {



  @Output () callParentFunction :EventEmitter<string> = new EventEmitter<any>()
  @Output () callParentFunction2 :EventEmitter<string> = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

  filterByPreference(filterOn){
    //this.filterArg = filterOn;
    this.callParentFunction.emit(filterOn);
  }

  datePicker($event){
    let startDate :string = $event[0].toJSON().split('T')[0];
    let endDate :string = $event[1].toJSON().split('T')[0];
    let newDate :any = {startDate :startDate, endDate :endDate}
    this.callParentFunction2.emit(newDate);
  }
}
