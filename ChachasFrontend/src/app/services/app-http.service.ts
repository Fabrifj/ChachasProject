import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import paths from './endpoints.json';
@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private http: HttpClient) { }


  //Products

  getAllProducts() {
    
    return this.http.get(paths.GetAllProducts)
  }

  getProductsBySubsidiaryAndType(idSub:any , type:any ){
    //"GetProductsBySubsidiaryAndType":"/api/product/subsidiary/:idSub/type/:type",
    var path = paths.GetProductsBySubsidiaryAndType + idSub + "/type/"+type;
    return this.http.get(path)

  }
  getProductsBySubsidiary(idSub:any){
    var path = paths.GetProductsBySubsidiary + idSub;
    return this.http.get(path);

  }

  

  //Sucursal
  getSubsidiary(){

    return this.http.get(paths.GetSubsidiary)
  }





}
