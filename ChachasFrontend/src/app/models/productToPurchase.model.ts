export class  ProductToPurchaseModel {
  public Name: string;
  public Price: number;
  public Quantity:number;
  public Image: string;
  public Description: string;

  
    constructor(name:string,price: number,quantity:number,image:string, des: string ) {
      this.Name = name;
      this.Price = price;
      this.Quantity=quantity;
      this.Image = image;
      this.Description=des;

    }
}