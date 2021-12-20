import { AfterContentInit, Component, OnInit } from '@angular/core';
import { documentId } from '@angular/fire/firestore';
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
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Stock En Inventario'},
    {field:'Costo',header:'Costo'},
    {field:'Precio',header:'Precio'}

  ];

  columnsProdMini = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Cantidad en esta sucursal'}

  ];

 

  infoInsFab: any | undefined;
  columnsInsFab = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Stock en Inventario'},
    {field:'CantidadMinima',header:'Stock Minimo'},
    {field:'CantidadMedida',header:'Cantidad Medida'},
    {field:'TipoUnidad',header:'Tipo Unidad'},
    {field:'Costo',header:'Costo'}

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

  ];
  infoInsSub: any | undefined;
  columnsInsSub = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Stock en Inventario'},
    {field:'Costo',header:'Costo'},
    {field:'TipoUnidad',header:'Tipo de Unidad'}
  
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
  nameInsCButtons: string[] = ["Registrar Compra", "Registrar Consumo"];
  nameInsButtons: string[] = ["Registrar Consumo Insumo"];

  titlesProd:string [] = ['CantidadParaSucursal'];
  todayDate:any = undefined;

  selectedValue:any;

  idSubsidiary:any ="";

  latitude:any="";
  longitude:any="";
  zoom=16;





  isAlert= false;



  prLat = "he4"
  prLon = ""

  position:any = {}
  msgAlert : string = "";
  constructor(public modalService:ModalService , private serviceHttp: AppHttpService) { 

    

  }
  clickReadyMap(map: google.maps.Map){

    
    map.addListener('click',(e: google.maps.MouseEvent)=>{

      this.check(e.latLng,map);
      this.position = JSON.parse(JSON.stringify(e.latLng.toJSON()));
      console.log(this.position);
      this.prLat = this.position.lat;
      this.prLon = this.position.lng;
      console.log(this.prLat);
      console.log(this.prLon);
    })
    


  }

  check(latLng: google.maps.LatLng , map: google.maps.Map){
    const mark = new google.maps.Marker({
      
      position: latLng,
      map:map,


    });
    console.log("position",mark.getPosition());
    console.log(latLng.lat)
    console.log(latLng.lng)
    map.panTo(latLng);
  }
 

  ngOnInit(): void {

    //representacion de  la sucursal en la que nos encontramos.
    //this.idSubsidiary = "GfkkDi4yFpCCVFW2RlF9";
    this.idSubsidiary = "mAlmWL1myFMGbZW8WHw3";
    this.todayDate=new Date().toISOString().slice(0, 10);
    this.latitude = -16.489689;
    this.longitude= -68.119293;
  

    //obtener refrescos
    this.getDrink();

    //obtener insumos fabrica
    this.getSauce();
    
    //obtener Subsidiario
    this.getSubsidiaries();

    //obetner insumos sucursal 
    this.getOtherInvSub();
    
    //get all productos
    this.getProductsBySubsidiary();
    
    //get chachas
    this.getProdChachas();


 
    
  }




  giveAlert(){
    this.isAlert = true;
   
  }
  closeAlert(){
    this.isAlert = false;
    
  }

  getProductsBySubsidiary(){
  
    this.serviceHttp.getProductsBySubsidiary(this.idSubsidiary).subscribe((jsonFile:any)=>{
      
    } ,(error)=>{
        console.log("hubo error con productos")
    } )

  }

  miniumVerification(objs:any){

      var mustAlert = false;
      objs.forEach((element:any) => {

        if(element.CantidadInventario <= element.CantidadMinima){
        // if(element.CantidadInventario <= 100){
            console.log("entro a if");
            this.msgAlert = this.msgAlert + element.Nombre + " : Llegó a la cantidad mímina de " + element.CantidadInventario +" "+ "\n";
            mustAlert = true;
        }
      });
      if(mustAlert){
        this.giveAlert();
      }
  }


  getProdChachas(){

    this.serviceHttp.getProductsBySubsidiaryAndType(this.idSubsidiary,"Chacha").subscribe((jsonFile:any)=>{
      
      this.infoProd =jsonFile;
      this.miniumVerification(this.infoProd);
    } ,(error)=>{
        console.log("hubo error con productos");
    } )

  }
  getSauce(){

    this.serviceHttp.getProductsBySubsidiaryAndType(this.idSubsidiary,"InsumoFabrica").subscribe((jsonFile:any)=>{    
      this.infoInsFab =jsonFile;
      this.miniumVerification(this.infoInsFab);

    } ,(error)=>{
        console.log("hubo error con productos")

    } )

  }


  getDrink(){

    this.serviceHttp.getProductsBySubsidiaryAndType(this.idSubsidiary,"Refresco").subscribe((jsonFile:any)=>{
     
      this.infoDri = jsonFile;
      this.miniumVerification(this.infoDri);

    } ,(error)=>{
        console.log("hubo error con productos")
    } )
  }

  getOtherInvSub(){

    this.serviceHttp.getProductsBySubsidiaryAndType(this.idSubsidiary,"InsumoSucursal").subscribe((jsonFile:any)=>{
      this.infoInsSub =jsonFile;
    } ,(error)=>{
        console.log("hubo error con productos")
    } )

  }
  getSubsidiaries(){

    this.serviceHttp.getSubsidiary().subscribe((jsonFile:any)=>{
     
      
      this.infoSub =jsonFile;
      
      this.getProductsOfSucursales();

    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }

  creatSubsidiary(body:any){
    
    this.serviceHttp.postSub(body).subscribe((jsonFile:any)=>{
     
      console.log("Creado sucursal correctamente");
     
      

    } ,(error)=>{
        console.log("hubo error con sucursal")

    } )

  }
  createTransaction(body:any){
    this.serviceHttp.postTransaction(body)
    .subscribe((jsonFile:any)=>{

      alert('transaction realizada correctamente');
      this.getProdChachas();
      this.getSauce();
      this.getSubsidiaries();

    } ,(error)=>{
        console.log("hubo error con crear transaction")

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

     else if (response[0] == "Registrar Consumo")
    {
      this.modalService.abrir("modalIns-01");
    }
    else if (response[0] == "Registrar Consumo Insumo")
    {
      this.modalService.abrir("modalIns-01");
    }
    else if (response[0] == 'GuardarTodo'){
      this.selectedObject = [];
      let indice = response[2];
      this.selectedInfo[indice] = response[1]
    }

  }
  sendTransaction(){
    var date = this.todayDate;
    
    var idSubDestiny = "";
    this.infoSub.forEach((element:any) => {
      if (element.Nombre == this.selectedValue){
        //es la sucursal que quiero
        idSubDestiny = element.id;
      }
    });

    var listaProdSend :any = [];
    if(this.selectedInfo[5] != null){
      this.selectedInfo[5].forEach((producto:any) => {

        var cantidadPSucursal = parseInt(producto.CantidadParaSucursal);

        
        if(producto.CantidadParaSucursal != "0" && cantidadPSucursal < producto.CantidadInventario){
        
        listaProdSend.push({
          IdProducto:producto.id,
          Tipo : "Chacha",
          IdMenu:producto.IdMenu,
          Cantidad: cantidadPSucursal,
          Nombre :producto.IdMenu
  
        }); }

      });

    }
    if(this.selectedInfo[6] != null){

      this.selectedInfo[6].forEach((producto:any) => {

        var cantidadPSucursal = parseFloat(producto.CantidadParaSucursal);


        if(producto.CantidadParaSucursal != "0" && cantidadPSucursal < producto.CantidadInventario){
          
          listaProdSend.push({
            
            IdProducto:producto.id,
            Tipo : "InsumoFabrica",
            Cantidad: cantidadPSucursal,
            CantidadMedida : producto.CantidadMedida,
            TipoUnidad : producto.TipoUnidad,
            Nombre : producto.Nombre
          });
        }
        });
    }
    
    var transaction = JSON.stringify({IdOrigen:this.idSubsidiary  , Fecha: this.todayDate, IdDestino: idSubDestiny, ListaProductos:listaProdSend })
    
    this.createTransaction(JSON.parse(transaction));
   
  }

  getProductsOfSucursales(){

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
          
          if(jsonFile != null){

            jsonFile.forEach((chacha:any) => {
              chachas = chachas + "\n [ " + chacha.Nombre + " ] => [ " + chacha.CantidadInventario + " Unidades ] \n"; 
            });
            auxinfoSubs.infoInvChachas = chachas;
          }
          
        } ,(error)=>{
            console.log("hubo error chachas de otros");
        } );

        this.serviceHttp.getProductsBySubsidiaryAndType(element.id,"InsumoFabrica").subscribe((jsonFile:any)=>{
          if(jsonFile != null){
            jsonFile.forEach((salsa:any) => {
              salsas = salsas + "\n [ " + salsa.Nombre + " ] => [ " + salsa.CantidadInventario + " " +salsa.TipoUnidad+" ] \n";
            });
            auxinfoSubs.infoInvSalsas = salsas;
          }
          
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
    var cantidad = parseInt((<HTMLInputElement>document.getElementById("proMerma")).value);
    var idProd = this.selectedObject.idMenu;

    var merm = JSON.stringify({Fecha: fecha, Cantidad: cantidad})
    console.log(merm)
    console.log(fecha)
      this.serviceHttp.updateMerma(idProd,JSON.parse(merm))
      .subscribe((jsonFile:any)=>{


        alert('Merma creada correctamente');
        this.getProdChachas();

      } ,(error)=>{
          console.log("Error al crear merma")

      } )

      this.getProdChachas();

    
  }

  regConsumo(){

    var fecha = (<HTMLInputElement>document.getElementById("fechaM")).value;
    var nombre = this.selectedObject.Nombre;
    var gastoInv = parseInt((<HTMLInputElement>document.getElementById("proGasto")).value );
    var idProd = this.selectedObject.id;

    var consu = JSON.stringify({ Gasto : gastoInv})
    console.log(consu)
    this.serviceHttp.updateConsumo(idProd,JSON.parse(consu))
      .subscribe((jsonFile:any)=>{


        alert('Consumo creado correctamente');
        this.getSauce();
        this.getDrink();

      } ,(error)=>{
          console.log("Error al crear bien")

      } )

    
    
      this.getSauce();
      this.getDrink();
  }
  regCompra(){


    //revidar los metodos de 


    var costo = parseInt((<HTMLInputElement>document.getElementById("proCosto")).value);
    var cantidad = parseInt((<HTMLInputElement>document.getElementById("proCantidad")).value) ;
    
    var idProd = this.selectedObject.id;
    var origen = this.idSubsidiary ;
    var fecha = (<HTMLInputElement>document.getElementById("fechaC")).value;
  

    var comp = JSON.stringify({IdProducto: idProd, Fecha: fecha, Costo: costo, Cantidad: cantidad , Origen: origen })
    console.log(comp)
    console.log(idProd)

    this.serviceHttp.postPurchase2(JSON.parse(comp))
      .subscribe((jsonFile:any)=>{


        alert('Compra creada correctamente');
        this.getOtherInvSub();

      this.getDrink();

      } ,(error)=>{
          console.log("Error al crear la compra")

      } )

      this.getOtherInvSub();

      this.getDrink();
  }
  regProducto(){
    var nombre = (<HTMLInputElement>document.getElementById("proName")).value;
    var cantidad = parseInt((<HTMLInputElement>document.getElementById("proCantidadInv")).value) ;
    var cantidadMin= parseInt((<HTMLInputElement>document.getElementById("proCantidadMin")).value );
    var origen = this.idSubsidiary;
    var precioPro= parseInt((<HTMLInputElement>document.getElementById("proPrecio")).value );
    

    var prod = JSON.stringify({Nombre: nombre, CantidadInventario : cantidad, CantidadMinima : cantidadMin, Origen: origen , Precio: precioPro})
    console.log(prod)

    console.log((<HTMLInputElement>document.getElementById("proName")).value)

    this.serviceHttp.postProductRefresco(JSON.parse(prod))
      .subscribe((jsonFile:any)=>{
        alert('Producto creada correctamente');

        this.getOtherInvSub();
        this.getProdChachas();
        this.getProductsBySubsidiary();
        this.getDrink();

      } ,(error)=>{
          console.log("Error al crear el producto refresco")

      } ) 

      this.getOtherInvSub();
      this.getProdChachas();
      this.getProductsBySubsidiary();
      this.getDrink();
  }
  regInSuc(){
    var nombre = (<HTMLInputElement>document.getElementById("insName")).value;
    var tipo = (<HTMLInputElement>document.getElementById("insUS")).value;
    var cantidad = parseInt((<HTMLInputElement>document.getElementById("insCantidad")).value );
    var cantidadMEDS = parseInt((<HTMLInputElement>document.getElementById("insCantidadSMed")).value );
    var cantidadMin= parseInt((<HTMLInputElement>document.getElementById("insCantidadMin")).value );
    var origen = this.idSubsidiary;

    var inSu = JSON.stringify({Nombre: nombre, CantidadInventario : cantidad, CantidadMinima : cantidadMin, CantidadMedida : cantidadMEDS, Origen: origen , TipoUnidad: tipo})
    console.log(inSu)

    console.log((<HTMLInputElement>document.getElementById("proName")).value)

    this.serviceHttp.postInsumoSucursal(JSON.parse(inSu))
    .subscribe((jsonFile:any)=>{


      alert('Insumo sucursal creado correctamente');

    } ,(error)=>{
        console.log("Error al crear insumo sucrusal")

    } )

    this.getOtherInvSub();

      this.getDrink();
  }
  regInFab(){
      var nombre = (<HTMLInputElement>document.getElementById("insNameF")).value;
      var tipo = (<HTMLInputElement>document.getElementById("insUF")).value;
      var cantidad = parseInt((<HTMLInputElement>document.getElementById("insCantidadF")).value );
      var cantidadMEDF = parseInt((<HTMLInputElement>document.getElementById("insCantidadFMed")).value );
      
      var cantidadMin= parseInt((<HTMLInputElement>document.getElementById("insCantidadMinF")).value );
      var origen = this.idSubsidiary;

      var inFa = JSON.stringify({Nombre: nombre, CantidadInventario : cantidad, CantidadMinima : cantidadMin, CantidadMedida : cantidadMEDF,Origen: origen  , TipoUnidad: tipo})
      console.log(inFa)

      console.log((<HTMLInputElement>document.getElementById("proName")).value)

      this.serviceHttp.postInsumoFabrica(JSON.parse(inFa))
      .subscribe((jsonFile:any)=>{


        alert('Insumo fabrica creado correctamente');
        this.getSauce();
        this.getProdChachas();

      } ,(error)=>{
          console.log("Error al crear insumo fabrica")

      } )


      this.getSauce();
      this.getProdChachas();
  }

}
      
