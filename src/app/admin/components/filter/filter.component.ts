import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {



  @Output () callParentFunction :EventEmitter<string> = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

  filterByPreference(filterOn){
    //this.filterArg = filterOn;
    this.callParentFunction.emit(filterOn);
  }
}
