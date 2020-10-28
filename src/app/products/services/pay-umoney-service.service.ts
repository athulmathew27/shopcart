import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayUMoneyServiceService {

  constructor() { }

  makePayment(payUMoney) {
    let url = 'payment/payumoney';
    let body = payUMoney;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, JSON.stringify(body), options)
     .map(this.extractData)
     .catch(this.handleError);
  }
}
