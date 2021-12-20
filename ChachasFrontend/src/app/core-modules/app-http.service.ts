import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import paths from './config.json';
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

  getSubsidiaries(){
    return this.http.get(paths.GetSubsidiary)
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

  login(idUP:any){
    ///api/employee/username/:username/pass/:pass
    return this.http.get(paths.Authenticate+idUP)
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
  getSalsasFabrica(){

    return this.http.get(paths.GetSalsasFabrica);

  }
  getChachasFabrica(){

    return this.http.get(paths.GetChachasFabrica);

  }



  createProductFactory(body:any){
    return this.http.post(paths.CreateProductFactory , body);

  }

  updateProductFactory(id:any,body:any){
    var path = paths.UpdateProductFactory + id;
    return this.http.put(path,body);
  }

  //Menu
  getMenu(){
    return this.http.get(paths.GetMenus);

  }
  updateMenu(id:any,body:any){
    var path = paths.UpdateMenu + id;
    return this.http.put(path,body);
  }

  //Empleados

  postEmployee(body:any){


    return this.http.post(paths.CreateEmployee,body)
  }

  updateEmployee(CI:any , body:any){
    return this.http.put(paths.UpdateEmployee+CI,body);
  }
  

  getSubsidiaryId(idSub:any){
    var path = paths.GetSubsidiaryId + idSub;
    var data = this.http.get(path);
    return this.http.get(path)
  }

  deleteEmployee(CI:any){
    return this.http.delete(paths.DeleteEmployee+CI);
  }

  createSubsidiary(body:any){
    
    return this.http.post(paths.CreateSubsidiary, body)
  }
  updateSubsidiary(idSub:any , body:any){
    
    return this.http.put(paths.UpdateSubdidiaryId+idSub, body)
  }
  deleteSucursal(id:any){
    return this.http.delete(paths.DeleteSubsidiary+id);
  }
  getEmployeesByDomain(idDom:any){
    return this.http.get(paths.GetEmployeesbyDomain+idDom)
  }

  getRegisterCuenta(){
    return this.http.get(paths.GetRegisterCuentas);
  }

  getRegisterCuentaBySubsidiary(idCuenta:any){
    return this.http.get(paths.GetRegisterCuentaBySubsidiary+idCuenta)
  }


  postArqueo(body:any){
    return this.http.post(paths.CreateRegisterCuenta,body)
  } 

}