
export class ProductModel {
    public CantidadInventario:number;
    public CantidadMinima:number;
    public Costo: number;
    public IdMenu: number;
    public ImgURL: string;
    public Mermas:Mermas;

    public Nombre: string;
    public Origen: string;
    public Precio: number;
    public Tipo: string;
    public id: string;

    constructor(CI:number,CM:number,C:number,IM:number, IU:string, M:Mermas, N:string, O:string,P:number,T:string,id:string ) {
        this.CantidadInventario = CI;
        this.CantidadMinima = CM ; 
        this.Costo = C;
        this.IdMenu = IM;
        this.ImgURL = IU; 
        this.Mermas = M;
        this.Nombre = N; 
        this.Origen = O;
        this.Precio = P;
        this.Tipo   = T;
        this.id     = id;
    }
  }

  export class Mermas{
    public Cantidad:number;
    public Fecha:Date;
    constructor(c:number,f:Date){
        this.Cantidad = c ;
        this.Fecha = f ; 
    }
  }