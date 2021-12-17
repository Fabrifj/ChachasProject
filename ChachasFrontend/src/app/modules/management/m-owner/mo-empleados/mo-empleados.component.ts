import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';
import { AppHttpService } from 'src/app/core-modules/app-http.service';

@Component({
  selector: 'app-mo-empleados',
  templateUrl: './mo-empleados.component.html',
  styleUrls: ['./mo-empleados.component.css']
})
export class MoEmpleadosComponent implements OnInit {

  constructor(public modalService:ModalService, private serviceHttp: AppHttpService) { }

  isShownSH:boolean=false;
  selectedObject:any = {}
  selectedInfo:any ={}


  infoEmployee:any="";
  idEmp:any="";

  columnsEmployee = [
    {field:'Nombre',header:'Nombre'},
    {field:'id',header:'CI'},
    {field:'ApellidoM',header:'Apellido Materno'},
    {field:'ApellidoP',header:'Apellido Paterno'},
    {field:'Cargo',header:'Cargo'}, 
    {field:'Dominio',header:'Dominio'},
    
  ];

  employeeButtons: string[] = ["Editar Informacion", "Eliminar Informacion"];

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees(){

    this.serviceHttp.getEmployees().subscribe((jsonFile:any)=>{
     
      
      this.infoEmployee =jsonFile;
      

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

  verificar(){
    var myInput:any = document.getElementById("val");

    if (myInput== "sucursal") {
         this.isShownSH=true
   }
    else{
      this.isShownSH=false
      
    }
  } 
}
