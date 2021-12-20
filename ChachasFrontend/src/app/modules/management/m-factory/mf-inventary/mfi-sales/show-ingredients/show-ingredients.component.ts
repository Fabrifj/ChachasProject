import { Component, OnInit } from '@angular/core';
import { ingredientModel } from 'src/app/models/ingredient.model';
import { HacerCompraService } from 'src/app/modules/management/m-factory/mf-inventary/mfi-sales/mfi-sales.service';
import { AppHttpService } from 'src/app/core-modules/app-http.service';

@Component({
  selector: 'app-show-ingredients',
  templateUrl: './show-ingredients.component.html',
  styleUrls: ['./show-ingredients.component.css']
})
export class ShowIngredientsComponent implements OnInit {

  ingredientes: any|undefined;


  constructor(private servicioHttp: AppHttpService,private hacerCompraService:HacerCompraService) { }

  ngOnInit(): void {
    this.getIngredients();
  }
  getIngredients(){
    this.servicioHttp.getIngredients()
    .subscribe((jsonFile:any)=>{
      this.ingredientes = jsonFile;
      console.log(jsonFile)
    } ,(error)=>{
        console.log("hubo error obteniendo Ingredientes")
    } )
  }
  

}
