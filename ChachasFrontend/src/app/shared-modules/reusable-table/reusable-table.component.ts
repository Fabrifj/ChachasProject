import { Component, OnInit,OnChanges,Input, Output, EventEmitter } from '@angular/core';
import { ReusableTableService } from './reusable-table-service';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.css']
})
export class ReusableTableComponent implements OnInit {

  
  @Input() datos : any ;
  @Input() columnas: any;
  @Input() nombreBotones : string[] | undefined;
  @Input() colorLetra : string="cornsilk";
  @Input() indice : string = "0";

  //no usado
  @Input() espacioTexto : string = "0";

  @Input() titulosTextos :string[] = [];

  @Input() botonGuardarDatos : string="no";


  
  @Output() parentMethod = new EventEmitter<any>();

  espacioCantidadI :any ;
  
  lenDatos :any;
  lenTitulos : any; 


  misDatos :any;
  constructor( private servicioTabla : ReusableTableService ) { }
  ngOnInit()  {
    
    this.espacioCantidadI = parseInt(this.espacioTexto);
    const elem = document.getElementsByClassName('tablaContenedora');
    var indice  = parseInt(this.indice,10);
    const e = elem[indice];
    if(e instanceof HTMLElement){
      
       e.style.color = this.colorLetra;
   }


   this.servicioTabla.cambioTabla.subscribe(
      (nuevosDatos:any)=>{


   });

    /*for (let i =0 ; i< elem.length ; i++){
        console.log(i);
        const e = elem[i];
        if(e instanceof HTMLElement){
           console.log("entro a cambiar el color");
            e.style.color = this.colorLetra;
        }

    }  */

  }

  
 
  botonPresionado(nombreFuncion:string,objecto:any){
   
    this.parentMethod.emit([nombreFuncion,objecto])
    

  }
  
  guardarDT(){
    this.misDatos = this.datos;
    
    var indice1 = 0 ;
     
    this.misDatos.forEach((element:any) => {
      var indice2 = 0 ;
      this.titulosTextos.forEach((titulo:any) => {

        var nombreCC  = 'textoCantidad' + indice1 + indice2 ; 
        console.log(nombreCC)
        var valor = (<HTMLInputElement>document.getElementById(nombreCC)).value ;

        element[titulo] = valor
        indice2 = indice2 +1;
      });
      

      indice1= indice1+1;
    });
    
    
    console.log(this.misDatos);

    this.parentMethod.emit(['GuardarTodo',this.misDatos])
  }

  getId(j:any,i:any){
    var nombre = "textoCantidad";
    nombre = nombre + i + j ;  
    console.log(nombre);
    return nombre  ;

  }

}
