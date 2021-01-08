import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class CheckoutComponent implements OnInit {

  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  @ViewChild('stepper') private stepper: MatStepper;
  isEditable = true;
  toPay : number;
  isCompletedStep1 :boolean = false;
  isCompletedStep2 :boolean = false;
  isCompletedStep3 :boolean = false;
  editStep1 :boolean = true;
  selectedAddress : string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}

  completeStep2($event){
    console.log($event)
    this.isCompletedStep2 = true
    this.editStep1 = false
    this.stepper.next()
  }
  isAddressSelected(selectedAddress : string){
    if(selectedAddress){
      this.isCompletedStep1 = true;
      this.selectedAddress = selectedAddress;
    }
  }

}
