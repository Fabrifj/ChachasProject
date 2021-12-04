import { Injectable, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/core-modules/app-http.service';
import { ProductModel } from 'src/app/models/product.model';
import { ProductToPurchaseModel } from 'src/app/models/productToPurchase.model';
import { ClientInfoModel, DirectionModel, PurchaseModel } from 'src/app/models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService implements OnInit{

  purchase: PurchaseModel|any;
  productsToPurchase: ProductToPurchaseModel[]=[];
  productList: ProductModel[]=[]

  constructor(private appHttpService : AppHttpService) { 
    appHttpService.getProductListHttp().subscribe(
      (jsonFile) => {
        console.log(jsonFile);
        this.productList = <ProductModel[]>jsonFile;
        console.log(this.productList)
      });
      console.log("s"+this.productList);

  }
  ngOnInit(){

  }

  // Get the product list from a http request
  getProductList(){
    return this.productList;
  }
  // get the modify purchase detail from details 
  getPurchaseDetail(){
    return this.productsToPurchase
  }
  // we made a update from the list products to buy 
  getPurchaseDetailEdited(newListProduct:ProductToPurchaseModel[] ){
    this.productsToPurchase = newListProduct;
  }
  // adde products to products list to purchase 
  addProductToPurchase(id:Number,quantity:number){
    let product = this.productList[id.valueOf()]
    this.productsToPurchase.push( new ProductToPurchaseModel(product.Nombre, product.Precio,quantity, product.ImgURL,"producto"))
  }
  // recive the client info from client component 
  addClientInformatio(){

  }
  // send the puchase to a http service to do a post 
  makePurchase(clientInfo: ClientInfoModel | any){
    let date: Date = new Date(); 
    let dire: DirectionModel= new DirectionModel("Sucursal");  
    let purchase:PurchaseModel = {Direction:dire, PurchaseDetail:this.productsToPurchase, ClientInfo:clientInfo, Date:date }
    this.appHttpService.postPurchase(purchase);
    console.log(purchase);
    this.productsToPurchase=[];
  }
  
}
