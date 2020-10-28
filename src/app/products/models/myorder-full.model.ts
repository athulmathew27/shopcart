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
  date? : Date,
  price : number
}
