import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';
import { AppHttpService } from 'src/app/core-modules/app-http.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-mo-sucursales',
  templateUrl: './mo-sucursales.component.html',
  styleUrls: ['./mo-sucursales.component.css'],
  
})
export class MoSucursalesComponent implements OnInit {

  constructor(public modalService:ModalService, 
    private serviceHttp: AppHttpService,
    ) { }

  selectedObject:any = {}
  selectedInfo:any ={}

  infoSub:any="";
  idSubsidiary:any="";

  latitude:any="";
  longitude:any="";
  zoom=16;
  
  columnsSucursal = [
    {field:'id',header:'ID Sucursal'},
    {field:'Nombre',header:'Nombre'},
    {field:'Direccion',header:'Direccion'},
    {field:'Localizacion',header:'Ubicacion'},
    {field:'Telefono',header:'Telefono'}, 
    {field:'Departamento',header:'Departamento'}

  ];

  
  sucursalButtons: string[] = ["Editar Informacion", "Eliminar Informacion"];



  ngOnInit(): void {

    this.latitude = -16.489689;
    this.longitude= -68.119293;
    this.getSubsidiary()
    //load Places Autocomplete

    
  }


  
  getSubsidiary(){

    this.serviceHttp.getSubsidiary().subscribe((jsonFile:any)=>{
     
      
      this.infoSub =jsonFile;
      

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }



  functionChooseObj(response:any){
    this.selectedObject = response[1];

    if (response[0] == "Agregar Empleado"){

      this.modalService.abrir("modalMerma-01");

    }

    else if (response[0] == 'GuardarTodo'){
      this.selectedObject = [];
      let indice = response[2];
        
    }
  }


}
