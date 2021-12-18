import { Component, OnInit } from '@angular/core';
import {ProductModel} from '../../models/product.model'
import { SalesService } from '../sales/sales.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor( private salesService: SalesService) { }
  products: ProductModel[]=[]
  ngOnInit(): void {
    this.salesService.ProductsChanged.subscribe(
      (newProducts : ProductModel[] )=>{
        this.products = newProducts;
      }
      
    )
  }

}
