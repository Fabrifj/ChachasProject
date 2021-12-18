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

  changeGender(e:any) {

    console.log(e.target.value);
    if(e.target.value == "sucursal"){
      console.log("es sucursal")      
    }
    else if(e.target.value == "fabrica"){
      console.log("es fabrica")   
    }

    else{
      alert("Por favor, elija una opcion")
  }

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

  crearSucursales(body:any){
    this.serviceHttp.createSubsidiary(body)
    .subscribe((jsonFile:any)=>{

      alert('sucursal creada correctamente');
      
    } ,(error)=>{
        console.log("hubo error al crear sucursal")

    } )
  }

  sendSucursales(){
    var idSubDestiny = "";
    var Tipo = "Sucursal";
    //Nombre
    var Nombre = ((<HTMLInputElement>document.getElementById("nomSucursal")).value)
    
    //Apellido Paterno
    var Direccion = ((<HTMLInputElement>document.getElementById("dirSucursal")).value)
    
    //Apellido materno
    var Telefono = ((<HTMLInputElement>document.getElementById("telfSuc")).value)
        
   //Cargo
    var Departamento = "La Paz"


    //var Admin = "Admin"
    var sucursal = JSON.stringify({ Nombre:Nombre, Direccion:Direccion, Telefono:Telefono, Tipo:Tipo, Departamento: Departamento});
    this.crearSucursales(JSON.parse(sucursal))
    
  }
}
