import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';
import { AppHttpService } from 'src/app/core-modules/app-http.service';

@Component({
  selector: 'app-mo-arqueo',
  templateUrl: './mo-arqueo.component.html',
  styleUrls: ['./mo-arqueo.component.css']
})
export class MoArqueoComponent implements OnInit {

  constructor(private serviceHttp: AppHttpService) { }

  selectedObject:any = {}
  selectedInfo:any ={}
  selectedValueFilter:any;


  infoArqueo:any="";

  name:any=""; 
  todayDate:any = undefined;


  columnsArqueo = [
    {field:'Origen', header:'Origen'},
    {field:'CuentaInicial',header:'CuentaInicial'},
    {field:'Egresos',header:'Egresos'},
    {field:'Ingresos',header:'Ingresos'},
    {field: 'Fecha' ,header:'Fecha'},
    {field:'Saldo',header:'Saldo'}, 
   
    
  ];

  infoSub:any="";
  infoSubById:any="";
  columnsSub = [
    {field:'Nombre',header:'Nombre'},
    {field:'Direccion',header:'Direccion'},
    {field:'Departamento',header:'Departamento'},
    {field:'Telefono',header:'Telefono'},
    {field:'Tipo',header:'Tipo'},
  ];

  ngOnInit(): void {
      this.getArqueo()
      this.getSubsidiary()
     
      this.todayDate=new Date().toISOString().slice(0, 10);
      
  }

  changeFun(){
    var selectBox = document.getElementById("selectBox")!;
    
    console.log(selectBox)
  }

  fechaDisplay(){


    this.infoArqueo.forEach((element:any) => {
     let fecha = element.Fecha.seconds;
     let date ;
     date = new Date(fecha * 1000).toISOString().slice(0, 10);

     element.Fecha = date;
    });
  } 


   nameDisplay(){

    this.infoArqueo.forEach((element:any) => {
 
      let nombre = element.Origen;
          
      this.serviceHttp.getSubsidiaryId(nombre).subscribe((jsonFile:any)=>{
        this.infoSubById = jsonFile; 
        
     
        this.name = jsonFile.Nombre;
        element.Origen = this.name;
      }) 

     });
    
  } 


  getArqueo(){

    this.serviceHttp.getRegisterCuenta().subscribe((jsonFile:any)=>{
     
      
      this.infoArqueo =jsonFile;
      this.nameDisplay();
      this.fechaDisplay();
      

    } ,(error)=>{
        console.log("hubo error con arqueps")

    } )
  }

  getSubsidiary(){

    this.serviceHttp.getSubsidiary().subscribe((jsonFile:any)=>{
      
      this.infoSub = jsonFile;
      console.log(this.infoSub)
      
    } ,(error)=>{
        console.log("hubo error con las sucursales")

    } )
  }

  getRegisterByCuenta(idCuenta:any){
    this.serviceHttp.getRegisterCuentaBySubsidiary(idCuenta).subscribe((jsonFile:any)=>{
      
      this.infoArqueo =jsonFile;
      this.nameDisplay();
      this.fechaDisplay();
    } ,(error)=>{
     
    } )
    
  }

  filterA(){
    var idSub = "";

    this.infoSub.forEach((element:any) => {
      if (element.Nombre == this.selectedValueFilter && this.selectedValueFilter!='None'){
        idSub = element.id;
        
      }
    });

    if (this.selectedValueFilter!='None'){
      return this.getRegisterByCuenta(idSub);
    }

    else{
      return this.getArqueo();
    }
  }
}

