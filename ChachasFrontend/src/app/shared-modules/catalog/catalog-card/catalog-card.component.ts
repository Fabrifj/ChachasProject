import { Component,  OnInit, Input } from '@angular/core';
import {ProductModel} from '../../../models/product.model';
import { FormBuilder } from '@angular/forms';
import { SalesService } from '../../sales/sales.service';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.css']
})
export class CatalogCardComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private salesService:SalesService) { }

  @Input() productItem!: ProductModel;
  @Input() index=0
  
  checkoutForm = this.formBuilder.group({
    unitsInput: ''
  });

  ngOnInit(): void {
  }
  AddToCart(){
    //TO-DO Pasar los datos al servicio
    console.warn('Cantidad', this.checkoutForm.value['unitsInput'],'Index',this.index);

    this.salesService.addProductToPurchase(this.index,this.checkoutForm.value['unitsInput'])
    this.checkoutForm.reset();
    alert("Se logro ingresar  el producto correctamente")
  }

}
