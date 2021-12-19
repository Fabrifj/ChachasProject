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

  ngOnInit(): void {
      this.getArqueo()
      this.todayDate=new Date().toISOString().slice(0, 10);
  }

  getArqueo(){

    this.serviceHttp.getRegisterCuenta().subscribe((jsonFile:any)=>{
     
      
      this.infoArqueo =jsonFile;
      

    } ,(error)=>{
        console.log("hubo error con empleados")

    } )
  }

}
