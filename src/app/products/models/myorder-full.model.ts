import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface MyorderFull {
  category: string,
  delivaryAddress: string,
  orderId: string,
  paymentType: string,
  product: string,
  productID: string,
  quantity: number,
  toPay: number,
  status? :string,
  date? : any,
  price : number,
  myproductId : string
}
