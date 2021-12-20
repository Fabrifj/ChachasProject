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

  todayDate:any = undefined;


  columnsArqueo = [
    {field:'Origen',header:'Origen'},
    {field:'CuentaInicial',header:'CuentaInicial'},
    {field:'Egresos',header:'Egresos'},
    {field:'Ingresos',header:'Ingresos'},
    {field: 'Fecha' ,header:'Fecha'},
    {field:'Saldo',header:'Saldo'}, 
   
    
  ];

  infoSub:any="";
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
    //var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //alert(selectedValue);
    
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

  getArqueo(){

    this.serviceHttp.getRegisterCuenta().subscribe((jsonFile:any)=>{
     
      
      this.infoArqueo =jsonFile;
      this.fechaDisplay();
      

    } ,(error)=>{
        console.log("hubo error con empleados")

    } )
  }

  getSubsidiary(){

    this.serviceHttp.getSubsidiary().subscribe((jsonFile:any)=>{
    /* const x = this.getSubsidiary(Nombre); 
    x.snapshotChanges().getSubsidiary() */
      
      this.infoSub = jsonFile;
      console.log(this.infoSub)

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }

  getRegisterByCuenta(idCuenta:any){
    this.serviceHttp.getRegisterCuentaBySubsidiary(idCuenta).subscribe((jsonFile:any)=>{
     
      
      this.infoArqueo =jsonFile;
      

    } ,(error)=>{
      console.log('-----------------------------')
        console.log("hubo error con arqueo por cuenta")
        console.log('-----------------------------')

    } )
    console.log('-----------------------------')
    console.log("yess, Entro a getRegisterByCuenta")
    console.log(this.infoArqueo)
    console.log('-----------------------------')
  }

  filterA(){
    var idSub = "";

    this.infoSub.forEach((element:any) => {
      if (element.Nombre == this.selectedValueFilter && this.selectedValueFilter!='None'){
        idSub = element.id;
        console.log('entro al primer if')
      }
    });

    if (this.selectedValueFilter!='None'){
      
      /* console.log("NOMBRE");
      console.log(this.selectedValueFilter);
      console.log("DOMINIO")
      console.log(idDominio) */
      return this.getRegisterByCuenta(idSub);
      
    }

    else{
      return this.getArqueo();
    }
  }
}

