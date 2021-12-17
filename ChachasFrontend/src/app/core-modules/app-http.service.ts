import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import paths from '../core-modules/config.json';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



  
@Injectable({
  providedIn: 'root'
})
export class AppHttpService {


  constructor(private http: HttpClient ) { 

  }
  

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

  getEntity(){
    return this.http.get(paths.GetEntities)
  }
  //Empleado 
  getEmployees(){
    return this.http.get(paths.GetEmployees)
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


  ///Ingredientes
  getIngredients(){

    return this.http.get(paths.GetIngredients);

  }
  createIngredient(body:any){

    return this.http.post(paths.CreateIngInfo,body);
  }
  updateIngredient(id:any, body:any){
    var path = paths.UpdateIngredient + id;
    return this.http.put(path,body);

  }

  //producto Factory
  createProductFactory(body:any){
    return this.http.post(paths.CreateProductFactory , body);

  }

  //Menu
  getMenu(){
    return this.http.get(paths.GetMenus);

  }


}