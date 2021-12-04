import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import paths from '../core-modules/config.json';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {


  constructor(private http: HttpClient ) { }

  getProductListHttp(){
    return this.http.get(paths.GetAllProductFromASubsidiary);
  }
  postPurchase(purchase:any){
    this.http.post(paths.CreateOrder, purchase)
  }
    //Products

    getAllProducts() {
    
      return this.http.get(paths.GetAllProducts,{responseType: 'json'})
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
  
  
}
