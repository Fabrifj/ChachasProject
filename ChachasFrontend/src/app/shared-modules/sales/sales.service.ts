import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  ProductsChanged = new  EventEmitter<ProductModel[]>();

  constructor(private appHttpService : AppHttpService) { 
    appHttpService.getProductListHttp().subscribe(
      (jsonFile) => {
        this.productList = <ProductModel[]>jsonFile;
        this.ProductsChanged.emit(this.getProductList());
      });

  }
  ngOnInit(){

  }

  // Get the product list from a http request
  getProductList():ProductModel[]{
    return this.productList;
  }
  // get the modify purchase detail from details 
  getPurchaseDetail(){
    return this.productsToPurchase
  }
  // we made a update from the list products to buy 
  updatePurchaseDetailEdited(newListProduct:ProductToPurchaseModel[] ){
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
    alert("Se completo la venta ")

    console.log(purchase);
    this.productsToPurchase=[];
  }
  
}
