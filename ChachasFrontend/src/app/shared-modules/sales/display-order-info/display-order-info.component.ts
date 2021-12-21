import { Component, OnInit } from '@angular/core';
import { ProductToPurchaseModel } from 'src/app/models/productToPurchase.model';
import { LoginService } from 'src/app/modules/login/login.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-display-order-info',
  templateUrl: './display-order-info.component.html',
  styleUrls: ['./display-order-info.component.css']
})

export class DisplayOrderInfoComponent implements OnInit {

  productComponents: editComponent[] = []
  productsQuantity: number = 0

  productosPrueba: ProductToPurchaseModel[] = [];
  state:string="";
  nextStep:string="";
  constructor(
    private salesService:SalesService,
    private loginService:LoginService) { 
    this.productosPrueba = salesService.getPurchaseDetail();
    for (let producto of this.productosPrueba){
      let total = producto.Price * producto.Quantity
      let aux: editComponent = {product: producto, edit: false, totalPrice: total}
      this.productComponents.push(aux)
    }
    this.productsQuantity = this.productComponents.length
  }

  ngOnInit(): void {
    this.state = this.loginService.getStatus();
    console.log(this.state)
    if(this.state=="Login"){
      this.nextStep= "../client-info";
    }else{
      
      this.nextStep= "../location";
    }
  }

  editProductQuantity(comp: editComponent) {
    comp.edit = true
  }

  acceptEditOfProductQuantity(comp: editComponent, newQuantity: string) {
    let aux = Number(newQuantity)
    let newTotal = aux * comp.product.Price
    
    comp.product.Quantity = aux
    comp.totalPrice = newTotal

    comp.edit = false
  }

  deleteProductFromList(compToDelete: editComponent) {
    this.productComponents = this.productComponents.filter(component => component !== compToDelete)
    this.productsQuantity = this.productComponents.length
    this.updatedList()
  }
 
 /*acceptProductChoice() {
    this.updatedList();
    this.salesService.getPurchaseDetailEdited(this.productosPrueba)
  }*/
  updatedList(){
    this.productosPrueba = [];
    this.productComponents.forEach((element)=>{
      this.productosPrueba.push(element.product)
    })
    console.log(this.productosPrueba)
  }

  acceptProductChoice() {
    this.salesService.updatePurchaseDetailEdited(this.productosPrueba)

  }

  keepChoosing() {
    this.salesService.updatePurchaseDetailEdited(this.productosPrueba)

  }
}


 interface editComponent {
   product: ProductToPurchaseModel,
   edit: boolean,
   totalPrice: number
 }