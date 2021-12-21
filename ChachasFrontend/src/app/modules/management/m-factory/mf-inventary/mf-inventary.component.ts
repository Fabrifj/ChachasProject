import { Component, OnInit, ViewChild } from '@angular/core';
import { delay } from 'rxjs';
import { AppHttpService } from 'src/app/core-modules/app-http.service';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';
import { HacerCompraService } from 'src/app/modules/management/m-factory/mf-inventary/mfi-sales/mfi-sales.service';
import { ReusableTableComponent } from 'src/app/shared-modules/reusable-table/reusable-table.component';


@Component({
  selector: 'app-mf-inventary',
  templateUrl: './mf-inventary.component.html',
  styleUrls: ['./mf-inventary.component.css']
})
export class MfInventaryComponent implements OnInit {

 



  infoIng:any =[] ; 
  columnsIng = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de unidad'},
    {field:'CantidadInventario',header:'Cantidad en Inventario'},
    {field:'CostoMedio',header:'Costo'},
    {field:'CantidadMedida',header:'Cantidad por el costo'},
    {field:'CantidadMinima',header:'Cantidad minima'},
    
  ];
  datosIngBackUp:any | undefined;

  infoIngMini:any =[] ; 
  columnsIngMini = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de unidad'}
 
    
  ];


  infoIngMini2:any =[] ; 
  columnsIngMini2 = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de unidad'},
    {field:'CantidadMedida',header:'Cantidad'}
 
    
  ];

  infoMenu:any ={} ; 
  infoProd:any =[] ; 
  columnsProd = [
    {field:'Nombre',header:'Nombre'},
    {field:'CantidadInventario',header:'Cantidad en Inventario'},
    {field:'CantidadMinima',header:'Cantidad Minima'},
    {field:'Costo',header:'Costo'},
    {field:'Precio',header:'Precio'},
    
    
  ];
  infoSauce:any | undefined ; 
  columnsSauce = [
    {field:'Nombre',header:'Nombre'},
    {field:'TipoUnidad',header:'Tipo de unidad'},
    {field:'CantidadInventario',header:'Cantidad en Inventario'},
    {field:'CantidadMedida',header:'Cantidad Medida'},
    {field:'CantidadMinima',header:'Cantidad Minima'}
    
    
    
  ];


  infoMerm:any = [] ; 
  columnsMerm = [
    
    {field:'Cantidad',header:'Cantidad'},
    {field:'NombreMenu',header:'Nombre Menu'},
    {field:'Fecha',header:'Fecha'},
    {field:'IdSucursal',header:'Sucursal'}
 
  ];


  nameProdButtons :string[] = ["Ver Ingredientes","Modificar Producto","Producir Producto"];
  nameSauceButtons :string[] = ["Ver Ingredientes","Modificar Salsa","Reservar Salsa"];
  nameIngButtons :string[] = ["Modificar Ingrediente"];
  
  nameButtonIng:string = "";
  nameButtonProd:string = "";
  selectedObj:any = {};

  siModificoIng: boolean = false;
  siModificoProd: boolean = false;

  nameProv: string="";
  nitProv: string="";
  numBill:string="";
  nitBill:string="";
  numAut:string="";
  limitDate:any;

  titulosIng = ['Cantidad']

  nombreBotonesIng1: string[] = ['Agregar'];
  nombreBotonesIng2: string[] = ['Quitar'];

  datosIngrendientesCCantidad =[];
  imgUrl:any= "";
  msgAlert:string="";
  siChacha = true;



  cantidadRSalsa=0;
  cantidadPChacha=0;



  isAlert= false;

  
  

  //contador de click en modificar producto
  cont = 1;

  constructor(public modalService:ModalService , private serviceHttp: AppHttpService, public hacerCompraService:HacerCompraService) { }
  async ngOnInit(): Promise<void> {


    
    this.getChachasFabrica();
    this.getIngredients();
    //this.getMermas();
    
    
    //this.getSubsidiaries();
    //this.getProducts();
    
    this.getMermasWithNameMen()
    
    
  
  }


  getSubsidiaries(){

    this.serviceHttp.getSubsidiary().subscribe((jsonFile:any)=>{
     
      this.getMermaBySucursal(jsonFile);
      
    } ,(error)=>{
        console.log("hubo error con productos")

    } )
  }
  getMermaBySucursal(otherJson:any){

    otherJson.forEach((element:any) => {
      
      this.serviceHttp.getMermaBySubsidiary(element.id).subscribe((jsonFile:any)=>{
        this.infoMerm.push(jsonFile);
        console.log(jsonFile);
        
      } ,(error)=>{
          console.log("hubo error con productos")
  
      } )
  

    });
   

  }

  getMermasWithNameMen(){

   
      
      this.serviceHttp.getMermasWithNameMen().subscribe((jsonFile:any)=>{
        this.modificarFecha(jsonFile);
        
      } ,(error)=>{
          console.log("hubo error con productos")
  
      } )
  

    

  }

  modificarFecha(jsonFile:any){

    jsonFile.forEach((element:any) => {
        var newFecha = new Date(element.Fecha.seconds).toLocaleDateString() ;
        element.Fecha = newFecha;
        this.infoMerm.push(element)
        
    });

  }
 
  getProducts(){

    this.serviceHttp.getAllProducts().subscribe((jsonFile:any)=>{
      console.log("productos",jsonFile);
      var infoProducts : any = [];
      this.miniumVerification(jsonFile);

      jsonFile.forEach((element:any) => {
        if(element.TipoOrigen == "Fabrica"){

          infoProducts.push(element);
        }

      });

      this.getMenu(infoProducts);

    },(error)=>{
      console.log("hubo error con productos")
    }
    );
   

  }


  getSalsasFabrica(){

    this.serviceHttp.getSalsasFabrica().subscribe((jsonFile:any)=>{
      console.log("Salsas",jsonFile);
      this.infoSauce = jsonFile;
     

    },(error)=>{
      console.log("hubo error con ingredientes")
    }
    );
   

  }
  getChachasFabrica(){

    this.serviceHttp.getChachasFabrica().subscribe((jsonFile:any)=>{
      console.log("chachas",jsonFile);
      this.infoProd = jsonFile;
    
      this.getSalsasFabrica();

    },(error)=>{
      console.log("hubo error con ingredientes")
    }
    );
   

  }

  getMenu(structure:any){

    
    this.serviceHttp.getMenu().subscribe((jsonFile:any)=>{
      console.log("menu",jsonFile);

      structure.forEach((element2:any) => {
            
        jsonFile.forEach((element:any) => {


        
       
          if(element.id == element2.IdMenu){

            element2.Nombre = element.Nombre;
            element2.ImgURL = element.ImgURL;
  
          }
          

        });
        
        
      });
      this.infoProd = structure;
      console.log(this.infoProd);
    },(error)=>{
     console.log("hubo error con getMenu")
    }
    );

  }
 
  getIngredients(){

    this.serviceHttp.getIngredients().subscribe((jsonFile:any)=>{
      console.log("ingredientes",jsonFile);
      this.infoIng = jsonFile;
      this.datosIngBackUp = jsonFile;
    },(error)=>{
      console.log("hubo error con ingredientes")
    }
    );
   
   

  }

  createIngredient(body:any){

    this.serviceHttp.createIngredient(body).subscribe((jsonFile:any)=>{

      console.log("Todo bien con la creacion de ingrediente");
    },(error)=>{
      console.log("hubo error con ingredientes")
    }
    );
   
  }
  createProductFactory(body:any){
    this.serviceHttp.createProductFactory(body).subscribe((jsonFile:any)=>{

      console.log("Todo bien con la creacion de product");
    },(error)=>{
      console.log("hubo error con product")
    }
    );

  }


  createSalsaFactory(body:any){

    this.serviceHttp.createSalsaFactory(body).subscribe((jsonFile:any)=>{
      
      console.log("Todo bien con la creacion de salsa");
    },(error)=>{
      console.log("hubo error con product")
    }
    );

    
  }


  updateIngredient(id:any,body:any){

    this.serviceHttp.updateIngredient(id,body).subscribe((jsonFile:any)=>{

      console.log("Todo bien con la modificacion de ingrediente");
    },(error)=>{
      console.log("hubo error con ingredientes")
    }
    );
   
  }

  updateProduct(id:any,body:any){

    this.serviceHttp.updateProductFactory(id,body).subscribe((jsonFile:any)=>{

      console.log("Todo bien con la modificacion de product");
    },(error)=>{
      console.log("hubo error con product")
    }
    );
   
  }
  updateMenu(id:any,body:any){

    this.serviceHttp.updateMenu(id,body).subscribe((jsonFile:any)=>{

      console.log("Todo bien con la modificacion de menu");
    },(error)=>{
      console.log("hubo error con menu")
    }
    );
   
  }



  functionSelectObj(response :any){
    this.selectedObj = response[1];
    
    
    if( response[0] == "Modificar Ingrediente"){
     
     this.siModificoIng = true;
      this.openIngC('Modificar');

    }
    
    
    

  }

  functionAddModProd(response:any){


    if(response[0] == "Agregar"){

      
      var elemAgregar = response[1];
      
      //quitar de lista grande
      this.infoIng = this.infoIng.filter((obj:any) => obj.id !== elemAgregar.id);
      //agregar a lista pequna
      var elemNuevo = JSON.stringify({IdIngrediente: elemAgregar.id , Nombre: elemAgregar.Nombre , Costo: elemAgregar.CostoMedio , TipoUnidad:elemAgregar.TipoUnidad });
      this.infoIngMini.push(JSON.parse(elemNuevo));
      


      var costo = 0 ;
      this.infoIngMini.forEach((element:any) => {
        
         costo = costo + parseInt(element.Costo);
      });

      (<HTMLInputElement>document.getElementById("prodCost")).value = String(costo);

      
    }
    else if(response[0]=="Quitar"){
        //quitar
        
      
      
        var elemQuitar = response[1];
        var ingSeleccionado :any = {};
        this.datosIngBackUp.forEach((element:any) => {
          if(element.id == elemQuitar.IdIngrediente){
            ingSeleccionado = element;
          }
        });
        
        //qutiar mini lista
        this.infoIngMini = this.infoIngMini.filter((obj:any) => obj.IdIngrediente !== elemQuitar.IdIngrediente);
        
       // var elemNuevo = JSON.stringify({ id: elemQuitar.IdProducto , Nombre: elemQuitar.NombreProducto , ImgURL: elemQuitar.ImgURL});
       var costo = 0 ;
       this.infoIngMini.forEach((element:any) => {
          costo = costo + parseInt(element.Costo);
       });
 
       (<HTMLInputElement>document.getElementById("prodCost")).value = String(costo);
        this.infoIng.push( ingSeleccionado);



    }
    else if(response[0]=="GuardarTodo"){

      
      if(response[2]=="20") {

        
        
        console.log("para guardar: ", response[1]) ;
        this.datosIngrendientesCCantidad = response[1];
        var costo = 0 ;
        this.datosIngrendientesCCantidad.forEach((element:any) => {
           costo = costo + parseInt(element.Costo);
        });
  
        (<HTMLInputElement>document.getElementById("prodCost")).value = String(costo);


      }
      

    }
    else if( response[0] == "Producir Producto"){
      this.selectedObj = response[1] ;
      this.modalService.abrir('modalProd-02');

    }
    else if(response[0]=="Modificar Producto"){
      
      this.siModificoProd = true;

        this.selectedObj = response[1] ;
        this.infoIngMini = this.selectedObj.ListaIngredientes;

        this.probarImg();
       
        this.infoIngMini.forEach((element:any) => {
            //quitar de lista grande
            this.infoIng = this.infoIng.filter((obj:any) => obj.id !== element.IdIngrediente);
        });


        
      if(this.cont ==2 ){

  
        
        this.openProductC('Modificar Chacha');
        
        	this.cont = 1;
      }
      else{

        this.cont ++;  

      }
     
      //rellenamos los valores



    }
    else if(response[0]=="Modificar Salsa"){
      
      this.siModificoProd = true;

        this.selectedObj = response[1] ;
        this.infoIngMini = this.selectedObj.ListaIngredientes;
  
        this.probarImg();
       
        this.infoIngMini.forEach((element:any) => {
            //quitar de lista grande
            this.infoIng = this.infoIng.filter((obj:any) => obj.id !== element.IdIngrediente);
        });


        
      if(this.cont ==2 ){

  
        
        this.openProductS('Modificar Salsa');
        
        	this.cont = 1;
      }
      else{

        this.cont ++;  

      }
     
      //rellenamos los valores



    }
    else if(response[0]== "Reservar Salsa"){
      this.selectedObj = response[1];
      this.modalService.abrir('modalSauce-01');

    }
    else if( response[0] == "Ver Ingredientes"){
      console.log("-------------");
      this.selectedObj = response[1];
      console.log(this.selectedObj);
      this.infoIngMini2 = this.selectedObj.ListaIngredientes;
      this.modalService.abrir('modalIng-03');
    }

  }

  

  

  openProductC(action:any){

    this.siChacha = true;
    this.nameButtonProd = action;
    this.modalService.abrir('modalProd-01');


    var indice1 = 0 ;
   
    this.infoIngMini.forEach((element:any) => {
      var indice2 = 0 ;
      this.titulosIng.forEach((titulo:any) => {

        var nombreCC  = 'textoCantidadIng' + indice1 + indice2 ; 

      
        
        (<HTMLInputElement>document.getElementById(nombreCC)).value = element.CantidadMedida ;

        
        indice2 = indice2 +1;
      });
      

      indice1= indice1+1;
    });


  }
  openProductS(action:any){

    this.siChacha = false;
    this.nameButtonProd = action;
    this.modalService.abrir('modalProd-01');


    var indice1 = 0 ;
   
    this.infoIngMini.forEach((element:any) => {
      var indice2 = 0 ;
      this.titulosIng.forEach((titulo:any) => {

        var nombreCC  = 'textoCantidadIng' + indice1 + indice2 ; 

      
        
        (<HTMLInputElement>document.getElementById(nombreCC)).value = element.CantidadMedida ;

        
        indice2 = indice2 +1;
      });
      

      indice1= indice1+1;
    });


  }
  openIngC(action:any){
    this.nameButtonIng = action;
    
    this.modalService.abrir('modalIng-01');
  }
  seeHistoryM(){


    this.modalService.abrir('modalMerma-01');

  }

  createProduct(){

  
    
    this.modalService.cerrar('modalProd-01');

    if(this.datosIngrendientesCCantidad != []){
      console.log("no es undefined");
      this.selectedObj.ListaIngredientes = this.datosIngrendientesCCantidad;
    }
    
    if(this.nameButtonProd == 'Modificar Chacha'){

      var newMenu = JSON.stringify({ Nombre:this.selectedObj.Nombre , ImgURL: this.selectedObj.ImgURL });
      this.updateMenu(this.selectedObj.IdMenu , JSON.parse(newMenu));
      console.log("this.selectedObj:",this.selectedObj);


      this.selectedObj.ListaIngredientes2 = []
      this.selectedObj.ListaIngredientes.forEach((element:any) => {
        var obj = {}
        obj={IdIngrediente:element.IdIngrediente , Cantidad: element.Cantidad , TipoUnidad:element.TipoUnidad}

        this.selectedObj.ListaIngredientes2.push(obj);
      });



      var newProd = JSON.stringify({ IdMenu:this.selectedObj.IdMenu , ImgURL:this.selectedObj.ImgUrl,CantidadMinima: this.selectedObj.CantidadMinima, Precio:this.selectedObj.Precio ,ListaIngredientes: this.selectedObj.ListaIngredientes2  });
      console.log(newProd);
      
      this.updateProduct(this.selectedObj.Id , JSON.parse(newProd));

    }
    else if(this.nameButtonProd=='Crear Chacha'){
      //se crea el ingrediente
      var newProd = JSON.stringify({CantidadMinima: this.selectedObj.CantidadMinima ,ListaIngredientes: this.selectedObj.ListaIngredientes });
      console.log("this.selectedObj:",this.selectedObj);


      this.createProductFactory(JSON.parse(newProd));
    }
    
    else if(this.nameButtonProd == 'Modificar Salsa'){

    
      console.log("this.selectedObj:",this.selectedObj);

      var newProd = JSON.stringify({ CantidadMinima: this.selectedObj.CantidadMinima,ListaIngredientes: this.selectedObj.ListaIngredientes ,TipoUnidad:this.selectedObj.TipoUnidad , Nombre:this.selectedObj.Nombre, CantidadMedida:this.selectedObj.CantidadMedida});
      console.log(newProd);
      //this.updateProduct(this.selectedObj.id , JSON.parse(newProd));

    }
    else{
      //se crea salsa
      var newProd = JSON.stringify({CantidadMinima: this.selectedObj.CantidadMinima ,ListaIngredientes: this.selectedObj.ListaIngredientes ,TipoUnidad:this.selectedObj.TipoUnidad , Nombre:this.selectedObj.Nombre, CantidadInventario:0, CantidadMedida:this.selectedObj.CantidadMedida});
    
     
      console.log("this.selectedObj:",this.selectedObj);


      this.createSalsaFactory(JSON.parse(newProd));
    }


    this.datosIngrendientesCCantidad = []
    this.selectedObj = {};
    this.infoIngMini = []
    this.siModificoProd = false;
    this.getChachasFabrica();
    

  }
  createIng(){

    console.log("this.selectedObj:",this.selectedObj);
    this.modalService.cerrar('modalIng-01');
    if(this.nameButtonIng == 'Modificar'){

      
      this.updateIngredient(this.selectedObj.id , this.selectedObj);

    }
    else{
      //se crea el ingrediente
      this.selectedObj.CantidadInventario = 0;
      this.selectedObj.CostoMedio = 0;
      this.createIngredient(this.selectedObj);
    }
    
    this.imgUrl = "";
    this.selectedObj = {}
    this.siModificoIng = false;
    this.getIngredients();
  }
  
  realizarCompra(){
    this.hacerCompraService.registrarCompra(this.nitProv,this.nameProv,this.numBill,this.nitBill,this.numAut,this.limitDate);
    this.modalService.cerrar('modalFactura');
    this.hacerCompraService.ingredientes=[];
    this.nitProv='';
    this.nameProv='';
    this.numBill='';
    this.nitBill='';
    this.numAut='';
    this.limitDate=undefined;
  }
  miniumVerification(objs:any){

    var mustAlert = false;
    objs.forEach((element:any) => {

      if(element.CantidadInventario <= element.CantidadMinima){
      // if(element.CantidadInventario <= 100){
          console.log("entro a if");
          this.msgAlert = this.msgAlert +"--"+ element.Nombre + " : Llegó a la cantidad mímina de " + element.CantidadInventario +" "+ "\n";
          mustAlert = true;
      }
    });
    if(mustAlert){
      this.giveAlert();
    }
  }
  giveAlert(){
   this.isAlert = true;
   
  }
  closeAlert(){
    this.isAlert = false;
    
  }


  probarImg(){

    this.imgUrl = this.selectedObj.ImgURL;
  }


  reservarSalsa(){
    var id = this.selectedObj.id;
    var cantidad = this.cantidadRSalsa;

    var cantRes = JSON.stringify({id:id , cantidad:cantidad});

  }

  producirChacha(){
    var id = this.selectedObj.id;
    var cantidad = this.cantidadPChacha;

    var cantRes = JSON.stringify({id:id , cantidad:cantidad});

  }

}
