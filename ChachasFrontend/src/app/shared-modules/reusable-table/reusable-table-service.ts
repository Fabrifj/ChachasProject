import { Injectable } from '@angular/core';

import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ReusableTableService {

  constructor() { }

  datosTabla : any ;
  cambioTabla = new EventEmitter<any>();

  obtenerDatosTabla() {
    return this.datosTabla;
  }
  modificarDatosTabla(nuevosDatosTabla :any) {

    this.datosTabla = nuevosDatosTabla ; 
    this.cambioTabla.emit(this.obtenerDatosTabla());

  }

}
