import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ingredientModel } from 'src/app/models/ingredient.model';
import { HacerCompraService } from '../mfi-sales.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
  @ViewChild('amountInput', { static: false }) amount: ElementRef ;
  @ViewChild('costInput', { static: false }) cost: ElementRef ;

  ingredientes:ingredientModel[]=[];
  catidadIngredientes:number=0;
  totalCompra:number=0;
  constructor(public hacerCompraServicio:HacerCompraService) { }

  ngOnInit(): void {
    this.hacerCompraServicio.comprasCambio.subscribe(
      (newOrders:  ingredientModel[])=>{
        this.hacerCompraServicio.ingredientes = newOrders;
        this.calcularActualizacion();

      }
    )
  }
  calcularActualizacion(){
    this.catidadIngredientes = 0;
    this.totalCompra =0; 
    this.catidadIngredientes = this.hacerCompraServicio.ingredientes.length;
    for (let index = 0; index < this.catidadIngredientes; index++) {
      this.totalCompra += this.hacerCompraServicio.ingredientes[index].Costo;  
    }
    console.log("Lista compras",this.hacerCompraServicio.ingredientes)
  }


  eliminarPedido(i:number){
    let foo_object  = this.hacerCompraServicio.ingredientes[i]// Item to remove
    this.hacerCompraServicio.ingredientes = this.hacerCompraServicio.ingredientes.filter(obj => obj !== foo_object);
    alert('Elimino un elemento');
    this.calcularActualizacion();
  }

  cambioCantidad(i:number ){
    this.hacerCompraServicio.ingredientes[i].Cantidad = +this.amount.nativeElement.value;
    this.calcularActualizacion();
  }

  cambioCosto(i:number ){
    this.hacerCompraServicio.ingredientes[i].Costo = +this.cost.nativeElement.value; 
    this.calcularActualizacion();
  }

}
