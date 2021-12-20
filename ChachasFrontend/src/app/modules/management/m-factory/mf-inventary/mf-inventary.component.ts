import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/core-modules/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';
import { HacerCompraService } from 'src/app/modules/management/m-factory/mf-inventary/mfi-sales/mfi-sales.service';


@Component({
  selector: 'app-mf-inventary',
  templateUrl: './mf-inventary.component.html',
  styleUrls: ['./mf-inventary.component.css']
})
export class MfInventaryComponent implements OnInit {

  experimetoIngrediente =
  [{

    "Nombre" : "Carne de res molida",
    "TipoUnidad":"Kg.",
    "CantidadInventario":50,
    "CantidadMinima":10,
    "Costo": 4,
    "CantidadCosto":2
  
  }]
  
  experimetoProductoChacha =
  [{

    "Nombre" : "Chacha de carne",
	  "TipoUnidad": "Kg",
	  "CantidadInventario":5,
	  "Costo": 4,
	  "Precio": 5,
    "CantidadMinima":2,
	  "LiistaIngredientes":[
		  {
			  "Nombre":"Zanahoria",
			  "Cantidad": 3, 
			  "TipoUnidad" : "Unidades"  
		  }
		
	  ]
  
  }]
  experimetoProductoSalsa =
  [{

    "Nombre" : "Salsa de mani",
	  "TipoUnidad": "ml",
    "CantidadInventario":2000,
    "CantidadResultante":500,
    "CantidadMinima":100,
	  "LiistaIngredientes":[
		  {
			  "Nombre":"Zanahoria",
			  "Cantidad": 3, 
			  "TipoUnidad" : "Unidades"  
		  }
		
	  ]
  
  }]

  experimentoMerma=
  [{

    "Nombre": "chacha de carne",
    "Cantidad" : 2,
    "Fecha" : "2021-12-12",
    "Sucursal":"Sucursal 2"
  
  }]





  infoIng:any | undefined ; 
  columnsIng = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de unidad'},
    {field:'CantidadInventario',header:'Cantidad en Inventario'},
    {field:'CostoMedio',header:'Costo'},
    {field:'CantidadMedida',header:'Cantidad por el costo'},
    {field:'CantidadMinima',header:'Cantidad minima'},
    
  ];


  infoIngMini:any | undefined ; 
  columnsIngMini = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de unidad'},
    {field:'CantidadMedida',header:'Cantidad'},
    {field:'Costo',header:'Costo'}
    
  ];

  infoMenu:any ={} ; 
  infoProd:any =[] ; 
  columnsProd = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de unidad'},
    {field:'CantidadInventario',header:'Cantidad en Inventario'},
    {field:'Costo',header:'Costo'},
    {field:'Precio',header:'Precio'},
    
    
  ];
  infoSauce:any | undefined ; 
  columnsSauce = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de unidad'},
    {field:'CantidadInventario',header:'Cantidad en Inventario'},
    {field:'CantidadResultante',header:'Cantidad resultante receta'}
    
    
    
  ];


  infoMerm:any | undefined ; 
  columnsMerm = [
    {field:'Nombre',header:'Nombre'},
    {field:'Cantidad',header:'Tipo de unidad'},
    {field:'Fecha',header:'Fecha'},
    {field:'Sucursal',header:'Sucursal'}
 
    
  ];


  nameProdButtons :string[] = ["Ver Ingredientes","Modificar Producto","Producir Producto"];
  nameSauceButtons :string[] = ["Modificar Salsa"];
  nameIngButtons :string[] = ["Modificar Ingrediente"];
  
  nameButtonIng:string = "";
  selectedObj:any = {};

  siModificoIng: boolean = false;
  siModificoProd: boolean = false;

  nameProv: string="";
  nitProv: string="";
  numBill:string="";
  nitBill:string="";
  numAut:string="";
  limitDate:any;
  constructor(public modalService:ModalService , private serviceHttp: AppHttpService, public hacerCompraService:HacerCompraService) { }
  ngOnInit(): void {

    

    this.getIngredients();
    this.getMermas();
    this.getProducts();
    this.getSauce();
    
  }

  getProducts(){

    this.serviceHttp.getAllProducts().subscribe((jsonFile:any)=>{

      var infoProducts : any = [];
      jsonFile.forEach((element:any) => {
        if(element.Origen == "Fabrica"){

          infoProducts.push(element);

        }


      });

      this.getMenu(infoProducts);

    },(error)=>{
      console.log("hubo error con ingredientes")
    }
    );
   

  }


  getMenu(structure:any){


    this.serviceHttp.getMenu().subscribe((jsonFile:any)=>{


      structure.forEach((element2:any) => {
            
        jsonFile.forEach((element:any) => {


        console.log("id",element.id);
        console.log("id struc", element2.IdMenu);
       
          if(element.id == element2.IdMenu){

            element2.Nombre = element.Nombre;
            element2.ImgURL = element.ImgURL;
  
          }
          

        });
        
        
      });
      this.infoProd = structure;
      console.log(this.infoProd);
    },(error)=>{
     console.log("hubo error con getMenu")
    }
    );

  }
  getSauce(){

    this.infoSauce = this.experimetoProductoSalsa;
   

  }
  getIngredients(){

    this.serviceHttp.getIngredients().subscribe((jsonFile:any)=>{

      this.infoIng = jsonFile;
    },(error)=>{
      console.log("hubo error con ingredientes")
    }
    );
   
   

  }

  createIngredient(body:any){

    this.serviceHttp.createIngredient(body).subscribe((jsonFile:any)=>{

      console.log("Todo bien con la creacion de ingrediente");
    },(error)=>{
      console.log("hubo error con ingredientes")
    }
    );
   
  }
  updateIngredient(id:any,body:any){

    this.serviceHttp.updateIngredient(id,body).subscribe((jsonFile:any)=>{

      console.log("Todo bien con la modificacion de ingrediente");
    },(error)=>{
      console.log("hubo error con ingredientes")
    }
    );
   
  }
  getMermas(){

    this.infoMerm = this.experimentoMerma;

  }

  functionSelectObj(response :any){
    this.selectedObj = response[1];
    if( response[0] == "Modificar Producto"){


      this.openProductC('Modificar');

    }
    else if( response[0] == "Producir Producto"){

      this.modalService.abrir('modalProd-02');

    }
    else if( response[0] == "Modificar Salsa"){

      this.modalService.abrir('modalSauce-01');

    }
    else if( response[0] == "Modificar Ingrediente"){
     
     this.siModificoIng = true;
      this.openIngC('Modificar');

    }
    else if( response[0] == "Comprar Ingrediente"){

      this.modalService.abrir('modalIng-02');
    }
    else if( response[0] == "Ver Ingredientes"){
      this.infoIngMini = this.selectedObj.ListaIngredientes;
      this.modalService.abrir('modalIng-03');
    }

  }
  openProductC(action:any){

    
    this.modalService.abrir('modalProd-01');
  }
  openIngC(action:any){
    this.nameButtonIng = action;
    
    this.modalService.abrir('modalIng-01');
  }
  seeHistoryM(){


    this.modalService.abrir('modalMerma-01');

  }

  createProduct(){






  }
  createIng(){

    console.log("this.selectedObj:",this.selectedObj);
    this.modalService.cerrar('modalIng-01');
    if(this.nameButtonIng == 'Modificar'){

      
      this.updateIngredient(this.selectedObj.id , this.selectedObj);

    }
    else{
      //se crea el ingrediente
      this.createIngredient(this.selectedObj);
    }
    
    this.selectedObj = {}
    this.getIngredients();
  }
  
  realizarCompra(){
    this.hacerCompraService.registrarCompra(this.nitProv,this.nameProv,this.numBill,this.nitBill,this.numAut,this.limitDate);
    this.modalService.cerrar('modalFactura');
    this.hacerCompraService.ingredientes=[];
    this.nitProv='';
    this.nameProv='';
    this.numBill='';
    this.nitBill='';
    this.numAut='';
    this.limitDate=undefined;
  }

}
