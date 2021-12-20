import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ingredientModel } from 'src/app/models/ingredient.model';
import { AppHttpService } from 'src/app/core-modules/app-http.service';

@Injectable({
  providedIn: 'root'
})
export class HacerCompraService implements OnInit{

  comprasCambio = new EventEmitter<ingredientModel[]>();

  ingredientes:ingredientModel[] =[] ; 
  ListIngredients:any;
  constructor(private httpService: AppHttpService) {

   }

  ngOnInit(): void {

  }
  obtenerElementosHttp(){
    this.httpService.getIngredients().subscribe(
      (jsonFile: any) => {
        this.ListIngredients=jsonFile;
        
      });
  }


  // para lista 
  addIngrediente(id:string,nombre:string,TU:string,amount: number,precio:number, ) {
    let newOrderComprado = new ingredientModel(id,nombre,TU, amount, precio);
    this.ingredientes.push(newOrderComprado);
    this.comprasCambio.emit(this.obtenerListaCompras());
  }

  obtenerListaCompras() {
    return this.ingredientes.slice();
  }
/// para selecionar 
  obtenerElementos(ele:string){
    if(ele==""){return this.ingredientes}
    return this.ingredientes.find( (element)=> element.Nombre == ele); 
  }
  registrarCompra(){
    
  }
}
