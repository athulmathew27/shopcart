
import { Component, Input, OnInit , VERSION, ViewChild,AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import { OrderStatus } from '../../models/order-status.model';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-track-myorders-stepper',
  templateUrl: './track-myorders-stepper.component.html',
  styleUrls: ['./track-myorders-stepper.component.css']
})
export class TrackMyordersStepperComponent implements OnInit, AfterViewInit,OnChanges {

  private ngVersion: string = VERSION.full;
  @Input() statusData : OrderStatus
  @Input() currentProcess : number;
  isLinear = true;
  isEditable = false;
  process: Boolean;
  steps = [ "Ordered", "Shipped", 'Near By', "Delivered" ];
  currentStep : number = 0

  // name = 'Progress Bar';
  // //Demo purpose only, Data might come from Api calls/service
  // public counts = ["Order Placed","Shipped","Near By","Delivered"];
  // public orderStatus = ""

  @ViewChild('stepper') stepper: MatStepper;
  constructor() { }

  ngOnInit(): void { }
  ngAfterViewInit(){
    this.process = true;
    setTimeout(() => {
      this.currentStep = this.currentProcess;
      this.process = false;
    }, 1500);
  }

  ngOnChanges(changes : SimpleChanges){
    if(changes.statusData.currentValue && changes.currentProcess.currentValue){
    this.process = true;
    setTimeout(() => {
      this.currentStep = this.currentProcess;
      this.process = false;
    }, 1500);
     }
  }

}
