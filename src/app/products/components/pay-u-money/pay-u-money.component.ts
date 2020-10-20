import { Component, Input, OnInit, SimpleChanges,OnChanges } from '@angular/core';

@Component({
  selector: 'app-pay-u-money',
  templateUrl: './pay-u-money.component.html',
  styleUrls: ['./pay-u-money.component.css']
})
export class PayUMoneyComponent implements OnInit,OnChanges {

  @Input() paymentDetails;
  @Input() selectedAddress;
  payAmt : number;
  cartProductId : string[];
  cartQuantity : number[];
  cartId : string[];
  address : string;
  constructor() { }

  ngOnInit(): void {  }
  ngOnChanges(changes : SimpleChanges){
    if(changes.paymentDetails.currentValue && changes.selectedAddress){
      this.payAmt = this.paymentDetails.toPay
      this.cartProductId = this.paymentDetails.cartProductId
      this.cartQuantity = this.paymentDetails.cartQuantity
      this.cartId = this.paymentDetails.cartId;

      this.address = this.selectedAddress
    }
}

  onPayUMoney(){

    var data = {
      key: 'ljBOWL9o',
      txnid: '123456789',
      hash: '8Uzaz40cXk',
      amount: 100,
      salt : '8Uzaz40cXk',
      firstname: 'Jaysinh',
      email: 'dummyemail@dummy.com',
      phone: 6111111111,
      productinfo: 'Bag',
      surl : 'https://stackoverflow.com/questions/tagged/payumone',
      furl: 'https://stackoverflow.com/questions/tagged/payumone',
      mode:'dropout'// non-mandatory for Customized Response Handling
  }
  var handler = {

    responseHandler: function(BOLT){
      console.log(BOLT.response)
      // your payment response Code goes here, BOLT is the response object

    },
    catchException: function(BOLT){
      console.log(BOLT.message)
      // the code you use to handle the integration errors goes here

    }
}
bolt.launch(data,handler)

  }
}
