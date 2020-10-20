import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  isEditable = true;
  toPay : number;
  isCompletedStep1 = false;
  isCompletedStep2 = false;
  isCompletedStep3 = false;

  selectedAddress : string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}

  isAddressSelected(selectedAddress : string){
    if(selectedAddress){
      this.isCompletedStep1 = true;
      this.selectedAddress = selectedAddress;
    }
  }

}
