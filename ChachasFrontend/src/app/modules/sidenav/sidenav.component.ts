import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';
import { LoginService } from '../login/login.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpService } from 'src/app/core-modules/app-http.service';
import { ResponseLogin } from 'src/app/models/responseLogin.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  form: FormGroup ;
  loading = false;
  submitted = false;
  returnUrl: string ="";
  todayDate:any = undefined;
  user:any=undefined;

  selectedObject:any = {}
  
  constructor(public modalService:ModalService, 
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appHttpService: AppHttpService,
    private loginService: LoginService,
    private serviceHttp: AppHttpService,
    ) {
      this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    }); 
  }
  //let tipo = new HomeComponent(); 
  
  isShownS:boolean=false;
  isShownO:boolean=false;
  isShownF:boolean=false; 
  isLogin:string="Logout";

  

  
  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.todayDate=new Date().toISOString().slice(0, 10);
    
    this.isLogin=this.loginService.getStatus();
    this.loginService.StatusChanged.subscribe((status:string)=>{
      this.isLogin = status;
      console.log(this.isLogin)
      this.getTypeCount();
    })
  }

  get f() { return this.form.controls; }

  login(){
    this.router.navigate(['/login']);
  }
  logout(){
    this.loginService.logOut();
  }
  getTypeCount(){
    let type = this.loginService.getAccountType();
    switch(type){
      case "Sucursal":{
        this.isShownS=true
        this.isShownO=false
        this.isShownF=false
        break;
      }
      case "Fabrica":{
        this.isShownF=true
        this.isShownS=false
        this.isShownO=false
        break;
      }
      case "Admin":{
        this.isShownO=true
        this.isShownS=false
        this.isShownF=false
        break;
      }
      default:{
        
        window.location.reload();
      }                            
    }
  }

//   onSubmit() {
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.form.invalid) {
//         return;
//     }

//     this.loading = true;
//     console.log(this.f['username'].value+"  "+this.f['password'].value)
//     let idPath = "username/"+this.f['username'].value+"/pass/"+this.f['password'].value
//     this.appHttpService.login(idPath)
//         .subscribe(

//             data => {
//               let dat2 = <ResponseLogin>data;
//               if(dat2.Status){
//                 switch(dat2.Tipo){
//                   case "Sucursal":{
//                     console.log("Este es el tipo desde sidenav" + dat2.Tipo)
//                     console.log(this.returnUrl+'m-subsidiary/'+dat2.Dominio);
//                     this.router.navigate([this.returnUrl+'m-subsidiary']);
//                     this.loginService.updatedUser(dat2);
//                     this.isShownS=true
//                     this.isShownO=false
//                     this.isShownF=false
//                     break;
//                   }
//                   case "Fabrica":{
//                     this.router.navigate([this.returnUrl+'m-factory']);
//                     this.loginService.updatedUser(dat2);
//                     this.isShownF=true
//                     this.isShownS=false
//                     this.isShownO=false
//                     break;
//                   }
//                   case "Admin":{
//                     this.router.navigate([this.returnUrl+'m-owner']);
//                     this.loginService.updatedUser(dat2);
//                     this.isShownO=true
//                     this.isShownS=false
//                     this.isShownF=false
//                     break;
//                   }
//                   default:{
//                     alert("Error");
//                     window.location.reload();
//                   }
//                 }
//               }else{
//                 alert("Error");
//                 window.location.reload();
//               }
//               // this.router.navigate([this.returnUrl]);
//             });
// }

  datoUsuario(){
    this.user =  this.loginService.getUser();
    console.log(this.user)
    
  }

   mandarMonto(){
    var monto = ((<HTMLInputElement>document.getElementById("montoCaja")).value)
    var fecha = this.todayDate
    
    var origen = this.loginService.getUser();

    //var origen = "fQUIYmDtANPICSeObads"
    var montoInicio = JSON.stringify({ CuentaInicial:monto, Fecha:fecha, Origen:origen})
    //console.log(montoInicio)
    this.createArqueo(JSON.parse(montoInicio))
  }

  createArqueo(body:any){
    this.serviceHttp.postArqueo(body)
    .subscribe((jsonFile:any)=>{

      alert('arqueo creado correctamente');


    } ,(error)=>{
        console.log("hubo error al crear el arqueo")

    } ) 

  } 

}
