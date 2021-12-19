import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/core-modules/app-http.service';

@Component({
  selector: 'app-mo-arqueo',
  templateUrl: './mo-arqueo.component.html',
  styleUrls: ['./mo-arqueo.component.css']
})
export class MoArqueoComponent implements OnInit {

  constructor(private serviceHttp: AppHttpService) { }

  columnsArqueo = [
    {fiel:'', header:'Sucursal'},
    {fiel:'', header:'Fecha'},
    {fiel:'', header:'Caja Inicial'},
    {fiel:'', header:'Ingresos'},
    {fiel:'', header:'Egresos'},
    {fiel:'', header:'Saldo'},
  ]

  infoArqueo=[
    'Sucursal',
    'Fecha',
    'Caja Inicial',
    'Ingresos',
    'Egresos',
    'Saldo',
  ]

  selectedObject:any = {}
  selectedInfo:any ={}
  selectedValue:any;

  infoSub: any | undefined;

  columnsSub = [
    {field:'Nombre',header:'Nombre'},
    {field:'Direccion',header:'Direccion'},
    {field:'Departamento',header:'Departamento'},
    {field:'Telefono',header:'Telefono'},
    {field:'Tipo',header:'Tipo'},


   // {field:'Imagen',header:'Imagen'}

  ];
  ngOnInit(): void {
    this.getArqueos()
    this.getSubsidiary()
  }

  getArqueos(){

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


}
