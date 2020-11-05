// import { Component, Input, OnInit, SimpleChanges,OnChanges } from '@angular/core';
// import * as sha512 from 'js-sha512';

// @Component({
//   selector: 'app-pay-u-money',
//   templateUrl: './pay-u-money.component.html',
//   styleUrls: ['./pay-u-money.component.css']
// })
// export class PayUMoneyComponent implements OnInit,OnChanges {

//   @Input() paymentDetails;
//   @Input() selectedAddress;
//   payAmt : number;
//   cartProductId : string[];
//   cartQuantity : number[];
//   cartId : string[];
//   address : string;
//   constructor() { }

//   ngOnInit(): void {  }
//   ngOnChanges(changes : SimpleChanges){
//     if(changes.paymentDetails.currentValue && changes.selectedAddress){
//       this.payAmt = this.paymentDetails.toPay
//       this.cartProductId = this.paymentDetails.cartProductId
//       this.cartQuantity = this.paymentDetails.cartQuantity
//       this.cartId = this.paymentDetails.cartId;

//       this.address = this.selectedAddress
//     }
// }

//   onPayUMoney(){
//     let  key= 'ljBOWL9o';
//     let  salt = '8Uzaz40cXk';

//     let txnid= '1234567809';
//     let amount= 100;
//     let firstname= 'Jaysinh';
//     let email= 'dummyemail@dummy.com';
//     let phone= 6111111111;
//     let productinfo= 'Bag';


// var hashSequence = key+"|"+txnid+"|"+amount+"|"+productinfo+"|"+firstname+"|"+email+"|||||||||||"+salt;
// console.log(hashSequence)
// let hashed = sha512.create().update(hashSequence).hex()
// console.log(hashed)

//     var data = {
//       key: 'ljBOWL9o',
//       txnid: '123456789',
//       hash: hashed,
//       amount: 100,
//       firstname: 'Jaysinh',
//       email: 'dummyemail@dummy.com',
//       phone: 6111111111,
//       productinfo: 'Bag',
//       surl : 'https://stackoverflow.com/questions/tagged/payumone',
//       furl: 'https://stackoverflow.com/questions/tagged/payumone',
//       mode:'dropout'// non-mandatory for Customized Response Handling
//     }
//     var handler = {
//       responseHandler: function(BOLT){
//         console.log(BOLT.response)
//       },
//       catchException: function(BOLT){
//         console.log(BOLT)
//       }
//     }
//     bolt.launch(data,handler)
//   }
// }













import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges,OnChanges } from '@angular/core';
import * as sha512 from 'js-sha512';

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

  key= 'ljBOWL9o';
  salt = '8Uzaz40cXk';

  txnid= '1234567809';
  amount= 100;
  firstname= 'Jaysinh';
  email= 'dummyemail@dummy.com';
  productinfo= 'Bag';
  surl = 'https://stackoverflow.com/';
  furl= 'https://stackoverflow.com/questions/tagged/payumone';
  phone = 1234567890;

  hashed : string = "";
  hashSequence : string ="";
  data :any;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {


    // this.hashSequence = this.key+"|"+this.txnid+"|"+this.amount+"|"+this.productinfo+"|"+this.firstname+"|"+this.email+"|||||||||||"+this.salt;
    // this.hashed = sha512.create().update(this.hashSequence).hex()
    // console.log(this.hashed)

    // this.data = {
    //   key: 'ljBOWL9o',
    //   txnid: '123456789',
    //   hash: this.hashed,
    //   amount: 100,
    //   firstname: 'Jaysinh',
    //   email: 'dummyemail@dummy.com',
    //   phone: 6111111111,
    //   productinfo: 'Bag',
    //   surl : 'https://stackoverflow.com/',
    //   furl: 'https://stackoverflow.com/questions/tagged/payumone',
    //   mode:'dropout'// non-mandatory for Customized Response Handling
    // }

    }
  ngOnChanges(changes : SimpleChanges){
    // if(changes.paymentDetails.currentValue && changes.selectedAddress){
    //   this.payAmt = this.paymentDetails.toPay
    //   this.cartProductId = this.paymentDetails.cartProductId
    //   this.cartQuantity = this.paymentDetails.cartQuantity
    //   this.cartId = this.paymentDetails.cartId;

    //   this.address = this.selectedAddress
    // }
}

  onPayUMoney(){



    // var handler = {
    //   responseHandler: function(BOLT){
    //     console.log(BOLT.response)
    //   },
    //   catchException: function(BOLT){
    //     console.log(BOLT)
    //   }
    // }
    // bolt.launch(this.data,handler)
  }


}
