import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-order-info',
  templateUrl: './display-order-info.component.html',
  styleUrls: ['./display-order-info.component.css']
})

export class DisplayOrderInfoComponent implements OnInit {

  productComponents: editComponent[] = []

  productosPrueba: Product[] = [
    {name: "chacha de charque", quantity: 10},
    {name: "chacha de queso", quantity: 2},
    {name: "chacha de carne", quantity: 5}
  ];

  constructor() { 
    for (let producto of this.productosPrueba){
      let aux: editComponent = {product: producto, edit: false}
      this.productComponents.push(aux)
    }
  }

  ngOnInit(): void {
  }

  editProductQuantity(comp: editComponent){
    comp.edit = true
    console.log("The element is now: " + comp.edit)
  }

  acceptEditOfProductQuantity(comp: editComponent, newQuantity: string){
    let aux = Number(newQuantity)
    comp.product.quantity = aux
    comp.edit = false
    console.log("The element is now: " + comp.edit)
  }
}

interface Product {
  name: string,
  quantity: number 
 }
 
 interface editComponent {
   product: Product,
   edit: boolean
 }