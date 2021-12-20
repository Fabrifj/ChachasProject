import { Component, OnInit } from '@angular/core';
import { HacerCompraService } from './mfi-sales.service';

@Component({
  selector: 'app-mfi-sales',
  templateUrl: './mfi-sales.component.html',
  styleUrls: ['./mfi-sales.component.css']
})
export class MfiSalesComponent implements OnInit {

  constructor(private hacerCompraServicio : HacerCompraService) { }

  ngOnInit(): void {
  }
  registrarCompra(){
    this.hacerCompraServicio.registrarCompra()
  }
}
