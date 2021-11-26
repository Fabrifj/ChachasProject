import { Component,  OnInit, Input } from '@angular/core';
import {productModel} from '../../../models/product.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.css']
})
export class CatalogCardComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,) { }

  @Input() productItem!: productModel;
  @Input() index=0
  
  checkoutForm = this.formBuilder.group({
    unitsInput: ''
  });

  ngOnInit(): void {
  }
  AddToCart(){
    //TO-DO Pasar los datos al servicio
    console.warn('Cantidad', this.checkoutForm.value['unitsInput'],'Index',this.index);
    this.checkoutForm.reset();
  }

}
