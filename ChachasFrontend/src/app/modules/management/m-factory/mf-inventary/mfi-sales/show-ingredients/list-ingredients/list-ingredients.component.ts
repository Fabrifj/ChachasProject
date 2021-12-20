import { Component, OnInit, Input } from '@angular/core';
import { HacerCompraService } from 'src/app/modules/management/m-factory/mf-inventary/mfi-sales/mfi-sales.service';

@Component({
  selector: 'app-list-ingredients',
  templateUrl: './list-ingredients.component.html',
  styleUrls: ['./list-ingredients.component.css']
})
export class ListIngredientsComponent implements OnInit {

  @Input() ingredient!: any;
  @Input() index=0; 
  constructor(private hacerCompraServicio:HacerCompraService) { }

  ngOnInit(): void {
  }
  anhadirIngrediente(){
    this.hacerCompraServicio.addIngrediente(
      this.ingredient.id,this.ingredient.Nombre,this.ingredient.TipoUnidad,1,this.ingredient.CostoMedio);
  }
}
