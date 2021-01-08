import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyorderFull } from '../../models/myorder-full.model';

@Component({
  selector: 'app-return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.scss']
})
export class ReturnItemComponent implements OnInit, OnChanges {
  @Input() products :MyorderFull;
  @Output() backToOrderPage :EventEmitter<any> = new EventEmitter();
  @Output() backToOrderPage2 :EventEmitter<any> = new EventEmitter();
  constructor(public firestore: AngularFirestore) { }

  ngOnInit(): void {  }
  ngOnChanges(changes :SimpleChanges){
    if(changes.products.currentValue){

    }
  }

  onSubmit(formData){
    let newObj = {
      reason : formData.reason,
      issue : formData.issue,
      comment : formData.comment,
      myProductId : this.products.myproductId,
      productId : this.products.productID,
      orderId : this.products.orderId,
      quantity : this.products.quantity
    }
    this.firestore.collection('returns').add(newObj).then(()=>{
      this.backToOrderPage2.emit("false")
    })
  }
  onCancel(){
    this.backToOrderPage.emit("false")
  }
}
