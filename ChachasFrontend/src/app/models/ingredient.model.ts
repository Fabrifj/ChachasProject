export class ingredientModel {
    public Id: string;
    public Nombre: string;
    public TipoUnidad: string;
    public Cantidad: number;
    public Costo: number;

  
    constructor(id: string, name: string, UM: string, cantidad:number,costo: number) {
      this.Id = id;
      this.Nombre = name;
      this.TipoUnidad = UM;
      this.Cantidad = cantidad;
      this.Costo = costo;
    }
  }
