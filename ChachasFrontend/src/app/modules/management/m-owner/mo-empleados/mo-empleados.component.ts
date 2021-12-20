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

  isShownES:boolean=false;
  isShown:boolean=false;
  type:any="";
  domain:any="";

  selectedObject:any = {}
  selectedInfo:any ={}
  selectedValue:any;
  selectedValueFilter:any;
  

  infoEmployee:any="";
  infoEmployeeF:any="";
  idEmp:any="";

  todayDate:any = undefined;

  columnsEmployee = [
    {field:'Nombre',header:'Nombre'},
    {field:'ApellidoM',header:'Apellido Materno'},
    {field:'ApellidoP',header:'Apellido Paterno'},
    {field:'id',header:'CI'},
    {field:'Cargo',header:'Cargo'}, 
    {field: 'Dominio' ,header:'Dominio'},
    {field:'Tipo',header:'Tipo'},
    
  ];

  employeeButtons: string[] = ["Editar Informacion", "Eliminar Informacion"];

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
    this.getEmployees()
    this.getSubsidiary()
    this.todayDate=new Date().toISOString().slice(0, 10);
  }

  getEmployees(){

    this.serviceHttp.getEmployees().subscribe((jsonFile:any)=>{
     
      
      this.infoEmployee =jsonFile;
      

    } ,(error)=>{
        console.log("hubo error con empleados")

    } )
  }
  getEmployeesByDomain(idDom:any){
    //this.infoEmployee ="";
    this.serviceHttp.getEmployeesByDomain(idDom).subscribe((jsonFile:any)=>{
     
      
      this.infoEmployee =jsonFile;
      

    } ,(error)=>{
        console.log("hubo error con mpleados por dominio")

    } )
    console.log("Entro a getEmployeeBy...")
    console.log(this.infoEmployee)
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



  functionChooseObj(response:any){
    this.selectedObject = response[1];

    if (response[0] == "Editar Informacion"){

      this.modalService.abrir("modalEmpleado-02");
      console.log(this.serviceHttp.getSubsidiaryId(this.selectedObject.Dominio))
      console.log("entro a editar")
      //console.log(this.selectedObject.Dominio)
    }

    else if (response[0] == 'Eliminar Informacion'){
      this.modalService.abrir('modalEmpleado-03');
      //console.log("entro a eliminar")
        
    }

  }

  changeFun(){
    var selectBox = document.getElementById("selectBox")!;
    //var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //alert(selectedValue);
    
    console.log(selectBox)
  }

  changeGender(e:any) {

    console.log(e.target.value);
    if(e.target.value == "sucursal"){
      this.type="sf"
      this.domain="sf"
      this.isShownES = true
      
      
    }
    else if(e.target.value == "admin"){
      this.isShownES = false
      this.type="Admin"
      this.domain="Administrador"
    }

    else{
      this.isShownES =false
      alert("Elija un tipo")
  }

}

  createEmployee(body:any){
    this.serviceHttp.postEmployee(body)
    .subscribe((jsonFile:any)=>{

      alert('empleado creado correctamente');

      this.getSubsidiary();
      this.getEmployees();

    } ,(error)=>{
        console.log("hubo error al crear empleado")

    } )

  }

  /* updateEmployees(idEmp:any, body:any){

    idEmp = this.selectedObject.id; 
    console.log("dentro de update" + idEmp)

    this.serviceHttp.updateEmployee(idEmp, body)
    .subscribe((jsonFile:any)=>{

      alert('empleado actualizado correctamente');

      this.getSubsidiary();
      this.getEmployees();
      

    } ,(error)=>{
        console.log("hubo error al actualizar el empleado")

    } )
      this.getSubsidiary();
      this.getEmployees();
  } */
  
  sendupdateEmployee(){
    var idSubDestiny = "";
    var Tipo = "";
    
    this.infoSub.forEach((element:any) => {
      if (element.Nombre == this.selectedValue){
        //es la sucursal que quiero
        idSubDestiny = element.id;
        Tipo = element.Tipo;

      }
    });

    //CI
    
    
    //Nombre
    var CI = this.selectedObject.id;
    
    var Nombre = ((<HTMLInputElement>document.getElementById("nomEmpleadoU")).value)
    
    //Apellido Paterno
    var ApellidoP = ((<HTMLInputElement>document.getElementById("apellidoPEmpleadoU")).value)
    
    //Apellido materno
    var ApellidoM = ((<HTMLInputElement>document.getElementById("apellidoMEmpleadoU")).value)
    
    //Contrasenia
   var Password = "Pass123"
    
   //Cargo
    var Cargo = ((<HTMLInputElement>document.getElementById("cargoEmpleadoU")).value)

    //var Admin = "Admin"
   
    if(this.type == 'Admin' && this.domain=='Administrador'){
      
      var admin = JSON.stringify({Nombre:Nombre, ApellidoP:ApellidoP, ApellidoM:ApellidoM, Password:Password, Cargo:Cargo, Tipo:this.type, Dominio: this.domain});
      console.log(admin)
      this.serviceHttp.updateEmployee(CI,JSON.parse(admin))
      .subscribe((jsonFile:any)=>{
        alert('Empleado actualizado correctamente');
        this.getSubsidiary();
        this.getEmployees();

      } ,(error)=>{
          console.log("Error al actualizar empleado")

      } )

      this.getSubsidiary();
      this.getEmployees();
      //this.updateEmployees()
    }
    else if(this.type == 'sf' && this.domain=='sf'){
      var empleado = JSON.stringify({ CI: CI, Nombre:Nombre, ApellidoP:ApellidoP, ApellidoM:ApellidoM, Password:Password, Cargo:Cargo, Tipo:Tipo, Dominio: idSubDestiny});
      console.log("entro al else if")
      console.log(empleado)
      this.serviceHttp.updateEmployee(CI,JSON.parse(empleado))
      .subscribe((jsonFile:any)=>{


        alert('Empleado actualizado correctamente');
        this.getSubsidiary();
        this.getEmployees();

      } ,(error)=>{
          console.log("Error al actualizar empleado")

      } )

      this.getSubsidiary();
      this.getEmployees();
      //console.log(empleado)
    }
    else{
      var empleado2 = JSON.stringify({ CI: CI, Nombre:Nombre, ApellidoP:ApellidoP, ApellidoM:ApellidoM, Password:Password, Cargo:Cargo});
      console.log("entro a else")
      console.log(empleado2)
      this.serviceHttp.updateEmployee(CI,JSON.parse(empleado2))
      .subscribe((jsonFile:any)=>{


        alert('Empleado actualizado correctamente');
        this.getSubsidiary();
        this.getEmployees();

      } ,(error)=>{
          console.log("Error al actualizar empleado")

      } )

      this.getSubsidiary();
      this.getEmployees();
      //this.updateEmployees()
    }    

    }
  


  sendEmployee(){
    var idSubDestiny = "";
    var Tipo = "";
    
    this.infoSub.forEach((element:any) => {
      if (element.Nombre == this.selectedValue){
        //es la sucursal que quiero
        idSubDestiny = element.id;
        Tipo = element.Tipo;

      }
    });

    //CI
    var CI = ((<HTMLInputElement>document.getElementById("ciEmpleado")).value)

    //Nombre
    var Nombre = ((<HTMLInputElement>document.getElementById("nomEmpleado")).value)
    
    //Apellido Paterno
    var ApellidoP = ((<HTMLInputElement>document.getElementById("apellidoPEmpleado")).value)
    
    //Apellido materno
    var ApellidoM = ((<HTMLInputElement>document.getElementById("apellidoMEmpleado")).value)
    
    //Contrasenia
   var Password = "Pass123"
    
   //Cargo
    var Cargo = ((<HTMLInputElement>document.getElementById("cargoEmpleado")).value)

    //var Admin = "Admin"
   
    if(this.type == 'Admin' && this.domain=='Administrador'){
      var admin = JSON.stringify({ CI: CI, Nombre:Nombre, ApellidoP:ApellidoP, ApellidoM:ApellidoM, Password:Password, Cargo:Cargo, Tipo:this.type, Dominio: this.domain});
      this.createEmployee(JSON.parse(admin))
    }
    
    else{
      var empleado = JSON.stringify({ CI: CI, Nombre:Nombre, ApellidoP:ApellidoP, ApellidoM:ApellidoM, Password:Password, Cargo:Cargo, Tipo:Tipo, Dominio: idSubDestiny});
      this.createEmployee(JSON.parse(empleado))
    }    

    }

   eliminarEmployee(){
     console.log('entro a eliminar')
    var CI = this.selectedObject.id;
    this.serviceHttp.deleteEmployee(CI)
    .subscribe((jsonFile:any)=>{


      alert('Empleado eliminado correctamente');
      
      this.getEmployees();

    } ,(error)=>{
        console.log("Error al eliminado empleado")

    } )

    this.getEmployees();
    //this.updateEmployees()
  }
  filter(){
    var idDominio = "";
    var Tipo = "";
    /* console.log("porque")
    console.log(this.selectedValueFilter) */
    this.infoSub.forEach((element:any) => {
      if (element.Nombre == this.selectedValueFilter && this.selectedValueFilter!='Administrador' && this.selectedValueFilter!='None'){
        idDominio = element.id;
        console.log('entro al primer if')
      }
    });
    
    if (this.selectedValueFilter!='None' && this.selectedValueFilter!='Administrador'){
      
      /* console.log("NOMBRE");
      console.log(this.selectedValueFilter);
      console.log("DOMINIO")
      console.log(idDominio) */
      return this.getEmployeesByDomain(idDominio);
      
    }
    else if(this.selectedValueFilter=='Administrador'){
      return this.getEmployeesByDomain(this.selectedValueFilter);
    }
    else {
      //es la sucursal que quiero
      // console.log("es None")
      return this.getEmployees();
    }
  }    
}
   
  

  

