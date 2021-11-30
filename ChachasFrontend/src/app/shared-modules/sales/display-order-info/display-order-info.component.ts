import { Component, OnInit } from '@angular/core';
import { ProductToPurchaseModel } from 'src/app/models/productToPurchase.model';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-display-order-info',
  templateUrl: './display-order-info.component.html',
  styleUrls: ['./display-order-info.component.css']
})

export class DisplayOrderInfoComponent implements OnInit {

  productComponents: editComponent[] = []

  productosPrueba: ProductToPurchaseModel[] = [];

  constructor(private salesService:SalesService) { 
    this.productosPrueba = salesService.getPurchaseDetail();
    for (let producto of this.productosPrueba){
      let total = producto.Price * producto.Quantity
      let aux: editComponent = {product: producto, edit: false, totalPrice: total}
      this.productComponents.push(aux)
    }
  }

  ngOnInit(): void {
  }

  editProductQuantity(comp: editComponent) {
    comp.edit = true
    console.log("The element is now: " + comp.edit)
  }

  acceptEditOfProductQuantity(comp: editComponent, newQuantity: string) {
    let aux = Number(newQuantity)
    let newTotal = aux * comp.product.Price
    
    comp.product.Quantity = aux
    comp.totalPrice = newTotal

    comp.edit = false
    console.log("The element is now: " + comp.edit)
  }

  acceptProductChoice() {

  }

  keepChoosing() {
    this.salesService.getPurchaseDetailEdited(this.productosPrueba)
  }
}


 interface editComponent {
   product: ProductToPurchaseModel,
   edit: boolean,
   totalPrice: number
 }