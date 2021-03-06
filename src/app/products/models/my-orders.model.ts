export interface Myorders{
  toPay : number,
  paymentType : string,
  delivaryAddress : string,
  userId : string,
  orderPlacedTime? : Date,
}

export interface Myproducts{
  productID : string,
  quantity : number,
  product : string,
  category : string,
  price : number,
  image : string,
  // shippedTime? : Date,
  // nearByTime? : Date,
  // deliveredTime? : Date
}
