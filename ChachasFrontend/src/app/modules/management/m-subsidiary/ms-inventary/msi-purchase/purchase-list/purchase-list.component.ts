import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ingredientModel } from 'src/app/models/ingredient.model';
import { PurchaseService } from '../../msi-purchase.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  @ViewChild('amountInput', { static: false }) amount: ElementRef ;
  @ViewChild('costInput', { static: false }) cost: ElementRef ;

  ingredientes:ingredientModel[]=[];
  catidadIngredientes:number=0;
  totalCompra:number=0;

  constructor(public purchaseService:PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.comprasCambio.subscribe(
      (newOrders:  ingredientModel[])=>{
        this.purchaseService.elementos = newOrders;
        this.calcularActualizacion();

      }
    )
  }
  calcularActualizacion(){
    this.catidadIngredientes = 0;
    this.totalCompra =0; 
    this.catidadIngredientes = this.purchaseService.elementos.length;
    for (let index = 0; index < this.catidadIngredientes; index++) {
      this.totalCompra += this.purchaseService.elementos[index].Costo;  
    }
    console.log("Lista compras",this.purchaseService.elementos)
  }


  eliminarPedido(i:number){
    let foo_object  = this.purchaseService.elementos[i]// Item to remove
    this.purchaseService.elementos = this.purchaseService.elementos.filter(obj => obj !== foo_object);
    alert('Elimino un elemento');
    this.calcularActualizacion();
  }

  cambioCantidad(i:number ){
    this.purchaseService.elementos[i].Cantidad = +this.amount.nativeElement.value;
    this.calcularActualizacion();
  }

  cambioCosto(i:number ){
    this.purchaseService.elementos[i].Costo = +this.cost.nativeElement.value; 
    this.calcularActualizacion();
  }

  

}
