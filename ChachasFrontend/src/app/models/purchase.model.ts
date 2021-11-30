import { ProductToPurchaseModel } from "./productToPurchase.model";

export interface PurchaseModel {
  Direction: DirectionModel;
  PurchaseDetail: ProductToPurchaseModel[];
  ClientInfo:ClientInfoModel;
  Date: Date;
}

export class DirectionModel {
  public Delivery:string;
  constructor(del:string){
    this.Delivery = del
  }
}
export interface ClientInfoModel{
  Name:string;
  LastName:string;
  Email:string;
  Nit:number;
  Number:number;

} 