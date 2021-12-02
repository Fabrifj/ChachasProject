import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/shared-modules/modal/modal.service';
import { AppHttpService } from 'src/app/services/app-http.service';
@Component({
  selector: 'app-ms-inventary',
  templateUrl: './ms-inventary.component.html',
  styleUrls: ['./ms-inventary.component.css']
})
export class MsInventaryComponent implements OnInit {




  
  
  selectedObject:any = {}
  selectedInfo:any = {}
  

  //chachas
  infoProd: any | undefined;
  
  columnsProd = [
    {field:'IdMenu',header:'Nombre'},
    {field:'CantidadInventario',header:'Stock En Inventario'},
    {field:'Costo',header:'Costo'},
    {field:'Precio',header:'Precio'}

  ];

  columnsProdMini = [
    {field:'IdMenu',header:'Nombre'},
    {field:'Cantidad',header:'Cantidad en esta sucursal'}

  ];

 

  infoInsFab: any | undefined;
  columnsInsFab = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Stock en Inventario'},
    {field:'CantidadMedida',header:'Cantidad Medida'},
    {field:'TipoUnidad',header:'Tipo Unidad'},
    {field:'Costo',header:'Costo'}
  
   // {field:'Imagen',header:'Imagen'}
    

  ];

  columnsInsFabMini = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Stock en Inventario'}

  ];

  infoDri: any | undefined;
  columnsDri = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Stock en Inventario'},
    {field:'Precio',header:'Precio'},
    {field:'Costo',header:'Costo'}
  
   // {field:'Imagen',header:'Imagen'}
    

  ];
  infoInsSub: any | undefined;
  columnsInsSub = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Stock en Inventario'},
    {field:'Costo',header:'Costo'},
    {field:'TipoUnidad',header:'Tipo de Unidad'}
    
  
   // {field:'Imagen',header:'Imagen'}
    

  ];



  infoSub: any | undefined;
  columnsSub = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Stock en Inventario'},
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


  idSubsidiary:any ="";

  constructor(public modalService:ModalService , private serviceHttp: AppHttpService) { }

  ngOnInit(): void {


    //
    this.idSubsidiary = "mAlmWL1myFMGbZW8WHw3";

    this.todayDate = new Date().toLocaleDateString();
    
    
    this.getDrink();

    //get insumos fabrica
    this.getSauce();
    //get Subsidiario
    this.getSubsidiaries();

    //get insumos sucursal 
    this.getOtherInvSub();
    
    //get all productos
    this.getProductsBySubsidiary();
    //get chachas
    this.getProdChachas()


    
  }

  getProducts(){

  
    
    this.serviceHttp.getAllProducts().subscribe((jsonFile:any)=>{
     
      console.log("los productos son",jsonFile);
    

    } ,(error)=>{
        console.log("hubo error con productos")

    } )


      
  }

  getProductsBySubsidiary(){

    var id = this.idSubsidiary;
    
    this.serviceHttp.getProductsBySubsidiary(id).subscribe((jsonFile:any)=>{
     
      console.log("los productos de sucursal son",jsonFile);
      
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )


      
  }
  getProdChachas(){

    var id = this.idSubsidiary;
    
    this.serviceHttp.getProductsBySubsidiaryAndType(id,"Chacha").subscribe((jsonFile:any)=>{
     
      console.log("las chachas son",jsonFile);
      this.infoProd =jsonFile;
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )

  }
  getSauce(){

    var id = this.idSubsidiary;
    
    this.serviceHttp.getProductsBySubsidiaryAndType(id,"InsumoFabrica").subscribe((jsonFile:any)=>{
     
      console.log("las salsas son",jsonFile);
      this.infoInsFab =jsonFile;
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )

  }


  getDrink(){

    var id = this.idSubsidiary;
    
    this.serviceHttp.getProductsBySubsidiaryAndType(id,"Refresco").subscribe((jsonFile:any)=>{
     
      console.log("la los refrescos son",jsonFile);
      this.infoDri = jsonFile;
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )

  }

  getOtherInvSub(){

    var id = this.idSubsidiary;
    
    this.serviceHttp.getProductsBySubsidiaryAndType(id,"InsumoSucursal").subscribe((jsonFile:any)=>{
     
      console.log("los insumos de sucursal son",jsonFile);
      this.infoInsSub =jsonFile;
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )

  }
  getSubsidiaries(){

    this.serviceHttp.getSubsidiary().subscribe((jsonFile:any)=>{
     
      console.log("las sucursales son son",jsonFile);
      this.infoSub =jsonFile;
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }

  creatSub(body:any){

    
    
    this.serviceHttp.postSub(body).subscribe((jsonFile:any)=>{
     
      console.log("Creado sucursal correctamente");
     
      

    } ,(error)=>{
        console.log("hubo error con sucursal")

    } )

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


  // Initialize and add the map
    

 


}