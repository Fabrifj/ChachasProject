import { getLocaleDateFormat } from '@angular/common';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/core-modules/app-http.service';

@Component({
  selector: 'app-mf-subsidiary',
  templateUrl: './mf-subsidiary.component.html',
  styleUrls: ['./mf-subsidiary.component.css']
})
export class MfSubsidiaryComponent implements OnInit {
  //subsInfo: subsidiaryInfo[] = [];
  baseSubsidiaryInfo: subsidiaryInfo = {
    id: "",
    Departamento: "",
    Nombre: "",
    Tipo: "",
    Localizacion: {
        latitude: 0,
        longitude: 0
    },
    Direccion: "",
    Telefono: 0
  }
  baseProductInfo: productInfo = {
    id: "", // both
    CantidadMinima: 0, // both
    CantidadInventario: 0, // both
    TipoUnidad: "", // Salsa
    TipoOrigen: "", // Salsa
    Origen: "", // both
    CantidadMedida: 0, // Salsa
    ImgURL: "", // both
    Tipo: "", // both
    Nombre: "", // both
    Costo: 0, // both
    Precio: 0, // Chacha
    IdMenu: "", // Chacha
  }

  // Aux variables to store info about the product that's being edited 
  productInfo: productInfo = this.baseProductInfo;
  subsidiaryInfo: subsidiaryInfo = this.baseSubsidiaryInfo;

  // General variables to store backend responses
  components: editionComponent[] = [];
  factory: editionComponent = {
    subsidiaryElement: this.baseSubsidiaryInfo,
    productElements: []
  }

  // Transaccions to realize
  transactions: transaction[] = [];

  constructor(private appHttpService : AppHttpService) {
    appHttpService.getSubsidiary().subscribe(
      (jsonSubsidiaryFile) => {
        var subsInfo = <subsidiaryInfo[]> jsonSubsidiaryFile;
        // console.log(this.subsInfo);

        for (let index = 0; index < subsInfo.length; index++) {
          const subsidiaryEl = subsInfo[index];
            
          var tempComponent: editionComponent ={
            subsidiaryElement: subsidiaryEl,
            productElements: []
          };
    
          appHttpService.getSubsidiaryInventary(subsidiaryEl.id).subscribe(
            (jsonProductsFile) => {
              tempComponent.productElements = <productInfo[]> jsonProductsFile;
            });

          if (subsidiaryEl.Tipo == "Fabrica") {
            this.factory = tempComponent;
          } else {
            this.components.push(tempComponent);
          }
        }

        console.log(this.components);
        console.log(this.factory)
      });
  }

  ngOnInit(): void {
  }

  editAmount = false;

  editSubsidiary(subInfo: subsidiaryInfo, prodInfo: productInfo) {
    // Saving crucial info for the transfer of products
    this.editAmount = true;
    this.productInfo = prodInfo;
    this.subsidiaryInfo = subInfo;

    if (this.transactions.find(e => e.IdDestino == subInfo.id) == undefined) {
      this.transactions.push({
        Tipo: "Fabrica",
        Fecha: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        IdOrigen: this.factory.subsidiaryElement.id,
        IdDestino: subInfo.id,
        ListaProductos: []
      })
    }

    console.log(JSON.stringify(this.transactions));
  }

  acceptEdition(newQuantity: string) {
    var value = Number(newQuantity);

    var productInFactory = <productInfo> this.factory.productElements.find(e => e.id == this.productInfo.id);
    if (productInFactory != undefined) {
      if ((value > 0) || (value <= productInFactory.CantidadInventario)) {
        var transaction = <transaction> this.transactions.find(e => e.IdDestino == this.subsidiaryInfo.id);
        transaction.ListaProductos.push({
          IdProducto: this.productInfo.id,
          Tipo: this.productInfo.Tipo,
          Cantidad: value,
          NombreProducto: this.productInfo.Nombre
        });

        productInFactory.CantidadInventario -= value;
        this.productInfo.CantidadInventario += value;
        alert("Transaction saved");

        this.productInfo = this.baseProductInfo;
        this.subsidiaryInfo = this.baseSubsidiaryInfo;
        this.editAmount = false;

      } else {
        alert("Value not valid");
      }
    } else {
      alert("Product not available in factory");
    }

    console.log(this.transactions)
  }

  saveTransactions() {
    for (let index = 0; index < this.transactions.length; index++) {
      const element = this.transactions[index];

      if (element.ListaProductos.length > 0) {
        console.log(JSON.stringify(element));
        //this.appHttpService.performFactorySubsidiaryTransaction(JSON.stringify(element));
      }      
    }

    alert("Chages saved in backend");
  }

  // createCopy(objectToCopy: infoChacha): infoChacha{
  //   return (JSON.parse(JSON.stringify(objectToCopy)));
  // }
}

interface subsidiaryInfo {
  id: string,
  Departamento: string,
  Nombre: string,
  Tipo: string,
  Localizacion: {
      latitude: number,
      longitude: number
  },
  Direccion: string,
  Telefono: number
}

interface productInfo {
  id: string, // both
  CantidadMinima: number, // both
  CantidadInventario: number, // both
  TipoUnidad: string, // Salsa
  TipoOrigen: string, // Salsa
  Origen: string, // both
  CantidadMedida: number, // Salsa
  ImgURL: string, // both
  Tipo: string, // both
  Nombre: string, // both
  Costo: number, // both
  Precio: number, // Chacha
  IdMenu: string, // Chacha
}

interface editionComponent {
  subsidiaryElement: subsidiaryInfo,
  productElements: productInfo[]
}

interface transaction {
  Tipo: string,
  Fecha: string,
  IdOrigen: string,
  IdDestino: string,
  ListaProductos: productoTransacción[]
}

interface productoTransacción {
  IdProducto: string,
  Tipo: string,
  Cantidad: number,
  NombreProducto: string
}