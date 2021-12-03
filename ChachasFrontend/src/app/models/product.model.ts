export class ProductModel {
    public Price: number;
    public Name: string;
    public Image: string;
    public Description: string;

  
    constructor(price: number, name: string, image: string, description: string) {
        this.Price = price;
        this.Name = name;
        this.Image = image;
        this.Description = description;
    }
  }
