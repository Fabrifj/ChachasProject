import { Component, Input, OnInit } from '@angular/core';
import {productModel} from '../../../models/product.model'

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.css']
})
export class CatalogCardComponent implements OnInit {

  constructor() { }

  @Input() productItem!: productModel;
  ngOnInit(): void {
  }
  AddToCart(){
    
  }

}
