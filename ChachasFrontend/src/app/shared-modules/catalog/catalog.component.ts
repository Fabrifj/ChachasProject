import { Component, OnInit } from '@angular/core';
import {productModel} from '../../models/product.model'

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor() { }
  products: productModel[]=[]
  ngOnInit(): void {
    this.products = [{Name:"empa",Price:15,Image:"https://bit.ly/3HYcNx2",Description:"Carne, queso y huevo"},
                      {Name:"empa",Price:16,Image:"https://bit.ly/3HYcNx2",Description:"Carne, queso y huevo"},
                      {Name:"empa",Price:14,Image:"https://bit.ly/3HYcNx2",Description:"Carne, queso y huevo"},
                      {Name:"empa",Price:16,Image:"https://bit.ly/3HYcNx2",Description:"Carne, queso y huevo"},
                      {Name:"empa",Price:15,Image:"https://bit.ly/3HYcNx2",Description:"Carne, queso y huevo"},
                      {Name:"empa",Price:15,Image:"https://bit.ly/3HYcNx2",Description:"Carne, queso y huevo"}]
  }

}
