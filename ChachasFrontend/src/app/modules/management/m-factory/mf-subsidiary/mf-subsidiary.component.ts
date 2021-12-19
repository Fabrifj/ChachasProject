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
  components: editionComponent[] = [];
  fabric: editionComponent | any;
  productInfo: productInfo | any;
  subsidiaryInfo: subsidiaryInfo | any;

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
            this.fabric = tempComponent;
          } else {
            this.components.push(tempComponent);
          }
        }

        console.log(this.components);
        console.log(this.fabric)
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
  }

  acceptEdition(newQuantity: string) {
  }

  // createCopy(objectToCopy: infoChacha): infoChacha{
  //   return (JSON.parse(JSON.stringify(objectToCopy)));
  // }
}

interface subsidiaryInfo {
  id: string,
  Departamento: string,
  Nombre: String,
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