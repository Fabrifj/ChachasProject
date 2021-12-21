import { Component, Input, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/core-modules/app-http.service';
import {PurchaseService} from 'src/app/modules/management/m-subsidiary/ms-inventary/msi-purchase.service';
@Component({
  selector: 'app-show-element',
  templateUrl: './show-element.component.html',
  styleUrls: ['./show-element.component.css']
})
export class ShowElementComponent implements OnInit {
  elementos: any|undefined;
  refrescos:any;
  insumos:any;
  @Input() idSubsidiary!:string;
  constructor(private servicioHttp: AppHttpService,private purchaseService:PurchaseService ) { }

  ngOnInit(): void {
    this.getDrink();
    this.getOtherInvSub();
  }
  getDrink(){

    this.servicioHttp.getProductsBySubsidiaryAndType(this.idSubsidiary,"Refresco").subscribe((jsonFile:any)=>{
     
      this.refrescos = jsonFile;
    } ,(error)=>{
        console.log("hubo error con productos")
    } )
  }
  getOtherInvSub(){

    this.servicioHttp.getProductsBySubsidiaryAndType(this.idSubsidiary,"InsumoSucursal").subscribe((jsonFile:any)=>{
      this.insumos =jsonFile;
    } ,(error)=>{
        console.log("hubo error con productos")
    } )

  }

}
