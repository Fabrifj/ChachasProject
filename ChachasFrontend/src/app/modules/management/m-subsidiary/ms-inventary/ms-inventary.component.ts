import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';

@Component({
  selector: 'app-ms-inventary',
  templateUrl: './ms-inventary.component.html',
  styleUrls: ['./ms-inventary.component.css']
})
export class MsInventaryComponent implements OnInit {




  experimentProd =
  
  [
    {
    "Id":"BCHEBCOOkkkBDOH",
    "Tipo":"Chacha",
    "IdMenu":"Chacha de aji", //Esto representa a la Chacha de Carne 
    "Origen": "ID-SUCURSAL",
    "Costo":7,
    "Precio":10,
    "Cantidad":16
  },
  {
    "Id":"BCHEBCOOkkkBDOH",
    "Tipo":"Chacha",
    "IdMenu":"Chacha charque" ,//Esto representa a la Chacha de Carne 
    "Origen": "ID-SUCURSAL",
    "Costo":7,
    "Precio":10,
    "Cantidad":16
  }


]

experimentDrink =
  
  [
    {
    "Id":"BCHEBCOOkkkBDOH",
    "Tipo":"Refresco",
    "Nombre":"Sprite", //Esto representa a la Chacha de Carne 
    "Origen": "ID-SUCURSAL",
    "Costo":10,
    "Precio":15,
    "Cantidad":16
  },
  {
    "Id":"BCHEBCOOkkkBDOH",
    "Tipo":"Refresco",
    "Nombre":"CocaCola " ,//Esto representa a la Chacha de Carne 
    "Origen": "ID-SUCURSAL",
    "Costo":8,
    "Precio":14,
    "Cantidad":16
  }


]

experimentIns =
  
  [
    
  {
    "Id":"BCHEBCOOkkkBDOH",
	"Tipo":"Insumo",  //Puede ser tambien alguna salsa MEJOR QUE SEA INSUMO
	"Nombre":"Aceite",
	"Origen": "ID-SUCURSAL",
	"Costo":7,
	"CantidadInventario":1600,
	"CantidadMedida":900,
	"TipoUnidad":"ml"
},
  {
    "Id":"BCHEBCOOkkkBDOH",
	"Tipo":"Insumo",  //Puede ser tambien alguna salsa MEJOR QUE SEA INSUMO
	"Nombre":"Salsa picante",
	"Origen": "ID-SUCURSAL",
	"Costo":7,
	"CantidadInventario":1600,
	"CantidadMedida":900,
	"TipoUnidad":"ml"},


]
  
  
  
  selectedObject:any = {}

  

  infoProd: any | undefined;
  
  columnsProd = [
    {field:'IdMenu',header:'Nombre'},
    {field:'Costo',header:'Costo'},
   
    {field:'Precio',header:'Precio'},
    {field:'Cantidad',header:'Cantidad'}
  
    

  ];

  columnsProdTransaction = [
    {field:'IdMenu',header:'Nombre'},
    {field:'Cantidad',header:'Cantidad'}
  
    

  ];

  infoIns: any | undefined;
  columnsIns = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Cantidad Inventario'},
    {field:'CantidadMedida',header:'Cantidad Medida'},
    {field:'TipoUnidad',header:'Tipo Unidad'},
    {field:'Costo',header:'Costo'}
  
   // {field:'Imagen',header:'Imagen'}
    

  ];

  infoDri: any | undefined;
  columnsDri = [
    {field:'Nombre',header:'Nombre'},
    {field:'Costo',header:'Costo'},

    {field:'Precio',header:'Precio'},
    {field:'Cantidad',header:'Cantidad'}
  
   // {field:'Imagen',header:'Imagen'}
    

  ];

  nameProdButtons: string[]= ["Registrar Merma"];
  nameDrinkButtons: string[] = ["Registrar Compra"];
  nameInsButtons: string[] = ["Registrar Consumo Insumo"];
  constructor(public modalService:ModalService) { }

  ngOnInit(): void {


    //
    this.getProducts();
    this.getDrink();
    this.getSauce();

  }

  getProducts(){

    this.infoProd = JSON.parse(JSON.stringify(this.experimentProd));

      console.log()
  }

  getSauce(){

    this.infoIns = JSON.parse(JSON.stringify(this.experimentIns));

      console.log()
  }


  getDrink(){

    this.infoDri = JSON.parse(JSON.stringify(this.experimentDrink));

      console.log()
  }


  //function register merma
  functionChooseObj(response:any){
    this.selectedObject = response[1];



    if (response[0] == "Registrar Merma"){

        this.modalService.abrir("modalMerma-01");

    }
    else if (response[0] == "Registrar Compra")
    {
      this.modalService.abrir("modalStock-01");
    }
    else if (response[0] == "Registrar Consumo Insumo")
    {
      this.modalService.abrir("modalIns-01");
    }

  }

  


}