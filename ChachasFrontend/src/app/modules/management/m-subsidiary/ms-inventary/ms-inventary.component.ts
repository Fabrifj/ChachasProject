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
    "Id":"JHI",
    "Tipo":"Chacha",
    "IdMenu":"Chacha de aji", //Esto representa a la Chacha de Carne 
    "Origen": "ID-SUCURSAL",
    "Costo":7,
    "Precio":10,
    "Cantidad":16
  },
  {
    "Id":"JHI",
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
    "Id":"BCH",
	"Tipo":"Insumo",  //Puede ser tambien alguna salsa MEJOR QUE SEA INSUMO
	"Nombre":"Aceite",
	"Origen": "ID-SUCURSAL",
	"Costo":7,
	"CantidadInventario":1600,
	"CantidadMedida":900,
	"TipoUnidad":"ml"
},
  {
    "Id":"BCH",
	"Tipo":"Insumo",  //Puede ser tambien alguna salsa MEJOR QUE SEA INSUMO
	"Nombre":"Salsa picante",
	"Origen": "ID-SUCURSAL",
	"Costo":7,
	"CantidadInventario":1600,
	"CantidadMedida":900,
	"TipoUnidad":"ml"},


]





experimentSub =
  
  [
    
  {
    "id":"jajajask", //Puede ser tambien alguna salsa MEJOR QUE SEA INSUMO
	"Nombre":"sucursal 1",
    "ubicacion": "avenida 2"
},
{
  "id":"skji", //Puede ser tambien alguna salsa MEJOR QUE SEA INSUMO
"Nombre":"sucursal 2" ,
"ubicacion": "avenida 2"

},
{
  "id":"smm", //Puede ser tambien alguna salsa MEJOR QUE SEA INSUMO
"Nombre":"sucursal 3",
"ubicacion": "avenida 2"

}


]
  
  
  
  
  selectedObject:any = {}
  selectedInfo:any = {}
  

  infoProd: any | undefined;
  
  columnsProd = [
    {field:'IdMenu',header:'Nombre'},
    {field:'Costo',header:'Costo'},
    {field:'Precio',header:'Precio'},
    {field:'Cantidad',header:'Cantidad'}

  ];

  columnsProdMini = [
    {field:'IdMenu',header:'Nombre'},
    {field:'Cantidad',header:'Cantidad en esta sucursal'}

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

  columnsInsMini = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Cantidad en esta sucursal'}

  ];

  infoDri: any | undefined;
  columnsDri = [
    {field:'Nombre',header:'Nombre'},
    {field:'Costo',header:'Costo'},

    {field:'Precio',header:'Precio'},
    {field:'Cantidad',header:'Cantidad'}
  
   // {field:'Imagen',header:'Imagen'}
    

  ];



  infoSub: any | undefined;
  columnsSub = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Cantidad Inventario'},
    {field:'CantidadMedida',header:'Cantidad Medida'},
    {field:'TipoUnidad',header:'Tipo Unidad'},
    {field:'Costo',header:'Costo'}
  
   // {field:'Imagen',header:'Imagen'}
    

  ];


  nameProdButtons: string[]= ["Registrar Merma"];
  nameDrinkButtons: string[] = ["Registrar Compra"];
  nameInsButtons: string[] = ["Registrar Consumo Insumo"];


  titlesProd:string [] = ['Cantidad para sucursal'];
  todayDate:string="";


  selectedValue:any;
  constructor(public modalService:ModalService) { }

  ngOnInit(): void {


    //
    this.todayDate = new Date().toLocaleDateString();
    this.getProducts();
    this.getDrink();
    this.getSauce();
    this.getSubsidiaries();

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

  getSubsidiaries(){

    this.infoSub = JSON.parse(JSON.stringify(this.experimentSub));

      console.log(this.infoSub);
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
    else if (response[0] == 'GuardarTodo'){
      this.selectedObject = []
      let indice = response[2];
      this.selectedInfo[indice] = response[1]
      console.log("Informacion:",this.selectedInfo)
    }

  }


  assignCorporationToManage(selectedValue:any) {
    console.log(selectedValue)
  }


  sendTransaction(){
    
  }

 


}