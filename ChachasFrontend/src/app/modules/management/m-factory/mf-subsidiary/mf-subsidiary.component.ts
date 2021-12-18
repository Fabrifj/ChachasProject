import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mf-subsidiary',
  templateUrl: './mf-subsidiary.component.html',
  styleUrls: ['./mf-subsidiary.component.css']
})
export class MfSubsidiaryComponent implements OnInit {
  factory = {
    chachas: 
    [
      {
      nombre: "Chacha de carne",
      idMenu: "jjdadad",
      cantidadInventario: 100
      },
      {
      nombre: "Chacha de queso",
      idMenu: "fsdjhfsdf",
      cantidadInventario: 120
      },
      {
      nombre: "Chacha de charque",
      idMenu: "jiureasdas",
      cantidadInventario: 90
      }
    ]
  }

  subsInfo: infoSucursal[] = [
    {
      subsidiary_id: "id_sucursal_1",
      nombre: "Sucursal_1",
      chachas: 
      [
        {
        nombre: "Chacha de carne",
        idMenu: "jjdadad",
        cantidadInventario: 8
        },
        {
        nombre: "Chacha de queso",
        idMenu: "fsdjhfsdf",
        cantidadInventario: 67
        },
        {
        nombre: "Chacha de charque",
        idMenu: "jiureasdas",
        cantidadInventario: 45
        }
      ]
    },
    {
      subsidiary_id: "id_sucursal_2",
      nombre: "Sucursal_2",
      chachas: 
      [
        {
        nombre: "Chacha de carne",
        idMenu: "jjdadad",
        cantidadInventario: 23
        },
        {
        nombre: "Chacha de queso",
        idMenu: "fsdjhfsdf",
        cantidadInventario: 21
        },
        {
        nombre: "Chacha de charque",
        idMenu: "jiureasdas",
        cantidadInventario: 32
        }
      ]
    },
    {
      subsidiary_id: "id_sucursal_3",
      nombre: "Sucursal_3",
      chachas: 
      [
        {
        nombre: "Chacha de carne",
        idMenu: "jjdadad",
        cantidadInventario: 40
        },
        {
        nombre: "Chacha de queso",
        idMenu: "fsdjhfsdf",
        cantidadInventario: 17
        },
        {
        nombre: "Chacha de charque",
        idMenu: "jiureasdas",
        cantidadInventario: 10
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  baseSubsidiary: infoSucursal = {
    subsidiary_id: "",
    nombre: "",
    chachas: []
  }

  baseChacha: infoChacha = {
    nombre: "",
    idMenu: "",
    cantidadInventario: 0
  }

  editAmount = false;
  chachaOnEdit = this.baseChacha
  subsidiaryOnEdit = ""

  editSubsidiary(subNombre: string, chacha: infoChacha) {
    // Saving crucial info for the transfer of products
    this.subsidiaryOnEdit = subNombre;
    this.chachaOnEdit = chacha;
    this.editAmount = true;
  }

  acceptEdition(newQuantity: string) {
    // Extra parsing, just to be sure
    let aux = Number(newQuantity)

    // Getting the pointer of the same product belonging to the factory
    var chachaInFactory = <infoChacha> this.factory.chachas.find(e => e.idMenu == this.chachaOnEdit.idMenu)

    // Valdiations
    if (aux <= chachaInFactory.cantidadInventario) {
      // Updating values in pointers
      this.chachaOnEdit.cantidadInventario += aux;
      chachaInFactory.cantidadInventario -= aux;

      // Updating transaction
    }
    else
    {
      alert("Cantidad en fabrica insuficiente");
    }

    // console.log(this.chachaOnEdit)
    // console.log(this.subsInfo)
    // console.log(this.factory)

    // Reseting saved info
    this.editAmount = false;
    this.chachaOnEdit = this.baseChacha
    this.subsidiaryOnEdit = ""
  }

  createCopy(objectToCopy: infoChacha): infoChacha{
    return (JSON.parse(JSON.stringify(objectToCopy)));
  }
}

interface infoSucursal {
  subsidiary_id: string,
  nombre: string,
  chachas: infoChacha[]
}

interface infoChacha {
  nombre: string,
  idMenu: string,
  cantidadInventario: number
}