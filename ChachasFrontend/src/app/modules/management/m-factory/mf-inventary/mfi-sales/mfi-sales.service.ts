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
  registrarCompra(nitProv:string,nameProv:string,numBill:string,nitBill:string,numAut:string,limitDate:any){
    var ingList = this.ingredientes.map((elem)=>({
      'IdObjeto':elem.Id,
      'Costo':elem.Costo,
      'Cantidad':elem.Cantidad
    }))

    let today=new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    let body = {
      "Fecha": date,
      "ListaObjetos":ingList,
      "Origen":"Fabrica",
      "Factura":{
        "NITProveedor":nitProv,
        "NombreProveedor":nameProv,
        "NumeroFactura":numBill,
        "NITFactura":nitBill,
        "NumeroAutorizacion":numAut,
        "FechaLimiteEmision":limitDate
      }
    }
    console.log("Factura estructura",JSON.parse(JSON.stringify(body)))
    this.httpService.postPurchase2(JSON.parse(JSON.stringify(body))).subscribe((response) => {
      console.log('Response from API', response);
    }, (error)=>{
      console.log('Error',error);
    })
  }
}
