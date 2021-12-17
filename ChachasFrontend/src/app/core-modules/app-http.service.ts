import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import paths from '../core-modules/config.json';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {


  constructor(private http: HttpClient ) { }

  getProductListHttp(){
    console.log("Estamos en get all lit product");
    return this.http.get(paths.GetAllProductFromASubsidiary);
  }
  postPurchase(purchase:any){
    return this.http.post(paths.CreateOrder, purchase)
    }
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

  postProductRefresco(body:any){
    
    return this.http.post(paths.CreateProductRefresco,body);

  } 
  updateMerma(idProd:any , body:any){
    
    return this.http.put(paths.UpdateMermasOfAProduct+idProd,body);

  }
  postInsumoSucursal(body:any){
    
    return this.http.post(paths.CreateProductInsumoSucursal,body);

  }
  postInsumoFabrica(body:any){
    
    return this.http.post(paths.CreateProductInsumoFabrica,body);

  }

  //Sucursal
  getSubsidiary(){

    return this.http.get(paths.GetSubsidiary)
  }
  postSub(body:any){
    
    return this.http.get(paths.CreateSubsidiary,body);

  }


  //Transaction
  postTransaction(body:any){


    return this.http.post(paths.CreateTransaction,body)
  }
  //Registrar consumo
  updateConsumo(idProd:any , body:any ){
    
    return this.http.put(paths.UpdateExpenseSupplySubsidiary+idProd,body);

  }
  
  //purchase
  postPurchase2(body:any){

    //metodo chicas
    
   return this.http.post(paths.crearCompra , body)
  }

  login(idUP:any){
    ///api/employee/username/:username/pass/:pass
    return this.http.get(paths.Authenticate+idUP)
  }  

}