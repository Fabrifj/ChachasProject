import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-order-info',
  templateUrl: './display-order-info.component.html',
  styleUrls: ['./display-order-info.component.css']
})

export class DisplayOrderInfoComponent implements OnInit {

  productComponents: editComponent[] = []
  productsQuantity: number = 0

  productosPrueba: Product[] = [
    {name: "Chacha de Charque", quantity: 10, price: 12, image: "https://img.freepik.com/foto-gratis/empanadas-espanolas-tipicas-blanco_123827-9710.jpg?size=626&ext=jpg", description: "es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen."},
    {name: "Chacha de Queso", quantity: 2, price: 9, image: "https://img.freepik.com/foto-gratis/empanadas-espanolas-tipicas-blanco_123827-9710.jpg?size=626&ext=jpg", description: "es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos."},
    {name: "Chacha de Carne", quantity: 5, price: 10, image: "https://img.freepik.com/foto-gratis/empanadas-espanolas-tipicas-blanco_123827-9710.jpg?size=626&ext=jpg", description: "es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta)"}
  ];

  constructor() { 
    for (let producto of this.productosPrueba){
      let total = producto.price * producto.quantity
      let aux: editComponent = {product: producto, edit: false, totalPrice: total}
      this.productComponents.push(aux)
    }
    this.productsQuantity = this.productComponents.length
  }

  ngOnInit(): void {
  }

  editProductQuantity(comp: editComponent) {
    comp.edit = true
  }

  acceptEditOfProductQuantity(comp: editComponent, newQuantity: string) {
    let aux = Number(newQuantity)
    let newTotal = aux * comp.product.price
    
    comp.product.quantity = aux
    comp.totalPrice = newTotal

    comp.edit = false
  }

  deleteProductFromList(compToDelete: editComponent) {
    this.productComponents = this.productComponents.filter(component => component !== compToDelete)
    this.productsQuantity = this.productComponents.length
  }

  acceptProductChoice() {

  }

  keepChoosing() {

  }
}

interface Product {
  name: string,
  quantity: number,
  price: number,
  image: string,
  description: string
 }
 
 interface editComponent {
   product: Product,
   edit: boolean,
   totalPrice: number
 }