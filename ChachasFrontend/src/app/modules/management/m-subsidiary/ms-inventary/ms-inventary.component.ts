import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/core-modules/app-http.service';

import { ModalService } from 'src/app/shared-modules/modal/modal.service';
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
    {field:'Direccion',header:'Direccion'},
    {field:'Departamento',header:'Departamento'},
    {field:'Telefono',header:'Telefono'}
  
   // {field:'Imagen',header:'Imagen'}
    
  ];

  infoSubs :any = [];
  columnsSubs = [
    {field:'Nombre',header:'Nombre'},
    {field:'Direccion',header:'Direccion'},
    {field:'Departamento',header:'Departamento'},
    {field:'Telefono',header:'Telefono'},
    {field:'infoInvSalsas',header:'Salsas => Stock Inventario'},
    {field:'infoInvChachas',header:'Chachas => Stock Inventario'}
   // {field:'Imagen',header:'Imagen'}
    
  ];

  nameProdButtons: string[]= ["Registrar Merma"];
  nameDrinkButtons: string[] = ["Registrar Compra"];
  nameInsButtons: string[] = ["Registrar Consumo Insumo"];


  titlesProd:string [] = ['CantidadParaSucursal'];
  todayDate:any = undefined;


  selectedValue:any;


  idSubsidiary:any ="";



  latitude:any="";
  longitude:any="";
  zoom=20;


  constructor(public modalService:ModalService , private serviceHttp: AppHttpService) { }

  ngOnInit(): void {


    //
    this.idSubsidiary = "mAlmWL1myFMGbZW8WHw3";

    var today = new Date();
    let dia :string=today.getDate().toString();
      let anio =today.getFullYear().toString();
      let mes = (today.getMonth() +1).toString();

      if(mes.length == 1){

        mes  = "0" + mes;
      }
      if(dia.length == 1){

        dia  = "0" + dia;
      }
      this.todayDate = anio + "-" + mes + "-" + dia;
    
    
    
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
    this.getProdChachas();


    


      this.latitude = -16.489689;
      this.longitude= -68.119293;
    
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
        console.log("hubo error con productos");
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
      
      this.getProductsOfSucursales();

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



  createTransaction(body:any){

    console.log("BODY:",body)
    this.serviceHttp.postTransaction(body)
    .subscribe((jsonFile:any)=>{


      alert('transaction realizada correctamente');

    } ,(error)=>{
        console.log("hubo error con crear transaction")

    } )

  }

  sendTransaction(){
    

    console.log("Informacion:",this.selectedInfo);

    var date = this.todayDate;
    console.log("sucursal:",this.selectedValue);

    var idSubDestiny = "";
    this.infoSub.forEach((element:any) => {
      if (element.Nombre == this.selectedValue){
        //es la sucursal que quiero
        idSubDestiny = element.id;
      }
    });

    var listaProdSend :any = {}
    let i = 0 ;
    this.selectedInfo[5].forEach((producto:any) => {
      if(producto.CantidadParaSucursal != "0"){
      var auxListProd :any = {}
      console.log("==>" , producto.IdMenu);
      auxListProd.IdProducto =producto.id;
      auxListProd.Tipo = "Chacha";
      auxListProd.Cantidad = producto.CantidadParaSucursal;
      auxListProd.NombreProducto = producto.IdMenu;

      listaProdSend[i] = auxListProd;
      i++;

      }
    });
    this.selectedInfo[6].forEach((producto:any) => {
      console.log("==>" , producto.Nombre);
     if(producto.CantidadParaSucursal != "0"){

      var auxListProd :any = {}
      
      auxListProd.IdProducto =producto.id;
      auxListProd.Tipo = "InsumoFabrica";
      auxListProd.Cantidad = producto.CantidadParaSucursal;
      auxListProd.CantidadMedida = producto.CantidadMedida;
      auxListProd.TipoUnidad = producto.TipoUnidad;
      auxListProd.NombreProducto = producto.Nombre;

      listaProdSend[i]=auxListProd;
      i++;

     }
      
    });

    var listaProdSend2 :any = {}
    listaProdSend2 = JSON.stringify(listaProdSend)
    console.log("lis", listaProdSend)

    var transaction = JSON.stringify({IdOrigen:this.idSubsidiary  , Fecha: this.todayDate, IdDestino: idSubDestiny, ListaProductos:listaProdSend2 })
    this.createTransaction(transaction);

  }

  getProductsOfSucursales(){

    console.log("Infosub 2", this.infoSub);
   
    let i =0;
    
   this.infoSub.forEach((element:any) => {
     

    
    if(this.idSubsidiary != element.id ){

      var auxinfoSubs :any ={};
      auxinfoSubs.Nombre = element.Nombre;
      auxinfoSubs.Direccion = element.Direccion;
      auxinfoSubs.Departamento=element.Departamento;
      auxinfoSubs.Telefono= element.Telefono;



      var chachas:any ="";
      var salsas: any = ""; 
      this.serviceHttp.getProductsBySubsidiaryAndType(element.id,"Chacha").subscribe((jsonFile:any)=>{
         
        
        
        jsonFile.forEach((chacha:any) => {

          
          chachas = chachas + "\n [ " + chacha.IdMenu + " ] => [ " + chacha.CantidadInventario + " Unidades ]";
          
          console.log("string chachas:" ,chachas);
        });
        auxinfoSubs.infoInvChachas = chachas;
   
      } ,(error)=>{
          console.log("hubo error chachas de otros");
      } );
      this.serviceHttp.getProductsBySubsidiaryAndType(element.id,"InsumoFabrica").subscribe((jsonFile:any)=>{
        
        
       jsonFile.forEach((salsa:any) => {
          salsas = salsas + "\n [ " + salsa.Nombre + " ] => [ " + salsa.CantidadInventario + " " +salsa.TipoUnidad+" ]";
        });
        auxinfoSubs.infoInvSalsas = salsas;

      } ,(error)=>{
          console.log("hubo error con salsas de otros");
      } )


     
      this.infoSubs[i] = auxinfoSubs;
      i++;
    }
   });
     
  }
//Metodos de POST 
regMerma(){

  var fecha = (<HTMLInputElement>document.getElementById("fechaM")).value;
  var cantidad = (<HTMLInputElement>document.getElementById("proMerma")).value;
  var idProd = this.selectedObject.IdMenu;

  var merm = JSON.stringify({ ListaArticulos : [] , Fecha: fecha, Cantidad: cantidad})
  console.log(merm)
  console.log(fecha)
    this.serviceHttp.updateMerma(idProd,JSON.parse(merm))
    .subscribe((jsonFile:any)=>{


      alert('ingrediente creada correctamente');

    } ,(error)=>{
        console.log("hubo error con crear bien")

    } )

  
}

regConsumo(){

  var nombre = this.selectedObject.Nombre;
  var cantidadInv = (<HTMLInputElement>document.getElementById("proCantidadMedSal")).value ;
  var cantidadMed= this.selectedObject.CantidadMedida;
  var cantidadMin = this.selectedObject.CantidadMinima ;
  var idProd = this.selectedObject.Id;
  var origen = this.idSubsidiary ;

  var consu = JSON.stringify({ ListaArticulos : [] , Nombre: nombre,  CantidadInventario : cantidadInv, CantidadMedida : cantidadMed, CantidadMinima: cantidadMin, Origen: origen  })
  console.log(consu)
  /*this.serviceHttp.postInsumoSucursal(JSON.parse(consu))
    .subscribe((jsonFile:any)=>{


      alert('ingrediente creada correctamente');

    } ,(error)=>{
        console.log("hubo error con crear bien")

    } )*/

    

  
}
regCompra(){

  var costo = (<HTMLInputElement>document.getElementById("proCosto")).value;
  var cantidad = (<HTMLInputElement>document.getElementById("proCantidad")).value ;
  
  var idProd = this.selectedObject.id;
  var origen = this.idSubsidiary ;
  var fecha = (<HTMLInputElement>document.getElementById("fechaC")).value;
 

  var comp = JSON.stringify({ ListaArticulos : [] , IdProducto: idProd, Fecha: fecha, Costo: costo, Cantidad: cantidad , Origen: origen })
  console.log(comp)
  console.log(idProd)

  this.serviceHttp.postInsumoSucursal(JSON.parse(comp))
    .subscribe((jsonFile:any)=>{


      alert('ingrediente creada correctamente');

    } ,(error)=>{
        console.log("hubo error con crear bien")

    } )

  
}
regProducto(){
  var nombre = (<HTMLInputElement>document.getElementById("proName")).value;
  var cantidad = (<HTMLInputElement>document.getElementById("proCantidadInv")).value ;
  var cantidadMin= (<HTMLInputElement>document.getElementById("proCantidadMin")).value ;
  var origen = this.idSubsidiary;
  var precioPro= (<HTMLInputElement>document.getElementById("proPrecio")).value ;
  

  var prod = JSON.stringify({ ListaArticulos : [] , Nombre: nombre, CantidadInventario : cantidad, CantidadMinima : cantidadMin, Origen: origen , Precio: precioPro})
  console.log(prod)

  console.log((<HTMLInputElement>document.getElementById("proName")).value)

   this.serviceHttp.postProductRefresco(JSON.parse(prod))
    .subscribe((jsonFile:any)=>{
      alert('ingrediente creada correctamente');

    } ,(error)=>{
        console.log("hubo error con crear bien")

    } ) 
}
regInSuc(){
  var nombre = (<HTMLInputElement>document.getElementById("insName")).value;
  var tipo = (<HTMLInputElement>document.getElementById("insUS")).value;
  var cantidad = (<HTMLInputElement>document.getElementById("insCantidad")).value ;
  var cantidadMin= (<HTMLInputElement>document.getElementById("insCantidadMin")).value ;
  var origen = this.idSubsidiary;

  var inSu = JSON.stringify({ ListaArticulos : [] , Nombre: nombre, CantidadInventario : cantidad, CantidadMinima : cantidadMin, Origen: origen , TipoUnidad: tipo})
  console.log(inSu)

  console.log((<HTMLInputElement>document.getElementById("proName")).value)

  this.serviceHttp.postInsumoSucursal(JSON.parse(inSu))
  .subscribe((jsonFile:any)=>{


    alert('ingrediente creada correctamente');

  } ,(error)=>{
      console.log("hubo error con crear bien")

  } )
}
regInFab(){
  var nombre = (<HTMLInputElement>document.getElementById("insNameF")).value;
  var tipo = (<HTMLInputElement>document.getElementById("insUF")).value;
  var cantidad = (<HTMLInputElement>document.getElementById("insCantidadF")).value ;
  var cantidadMin= (<HTMLInputElement>document.getElementById("insCantidadMinF")).value ;
  var origen = this.idSubsidiary;

  var inFa = JSON.stringify({ ListaArticulos : [] , Nombre: nombre, CantidadInventario : cantidad, CantidadMinima : cantidadMin, Origen: origen  , TipoUnidad: tipo})
  console.log(inFa)

  console.log((<HTMLInputElement>document.getElementById("proName")).value)

  this.serviceHttp.postInsumoFabrica(JSON.parse(inFa))
  .subscribe((jsonFile:any)=>{


    alert('ingrediente creada correctamente');

  } ,(error)=>{
      console.log("hubo error con crear bien")

  } )
}

}
      
    

    
    
    
  

    
    
    
    
      
     


  




  




