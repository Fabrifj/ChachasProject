import { Component, Input, OnInit } from '@angular/core';
import {PurchaseService} from 'src/app/modules/management/m-subsidiary/ms-inventary/msi-purchase.service';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})
export class ElementListComponent implements OnInit {

  @Input() element!: any;
  @Input() index=0; 
  constructor(private purchaseService:PurchaseService) { }

  ngOnInit(): void {
  }
  anhadirIngrediente(){
    this.purchaseService.addIngrediente(
      this.element.id,this.element.Nombre,this.element.TipoUnidad,1,this.element.Costo);
  }

}
