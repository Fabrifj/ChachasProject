export class ResponseLogin {
    public Status: string;
    public Tipo: string;
    public Dominio: string;


  
    constructor(s: string, t: string, d:string) {
      this.Status = s;
      this.Tipo = t;
      this.Dominio = d;

    }
  }