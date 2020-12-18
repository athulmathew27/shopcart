export interface Myorders{
  toPay : number,
  paymentType : string,
  delivaryAddress : string,
  userId : string
}

export interface Myproducts{
  productID : string,
  quantity : number,
  product : string,
  category : string,
  price : number,
  image : string,
  orderPlacedTime? : Date,
  // shippedTime? : Date,
  // nearByTime? : Date,
  // deliveredTime? : Date
}
