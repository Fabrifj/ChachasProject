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
  
  constructor(public modalService:ModalService, 
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appHttpService: AppHttpService,
    private loginService: LoginService,
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

  
  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
  }

  get f() { return this.form.controls; }

  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    console.log(this.f['username'].value+"  "+this.f['password'].value)
    let idPath = "username/"+this.f['username'].value+"/pass/"+this.f['password'].value
    this.appHttpService.login(idPath)
        .subscribe(

            data => {
              let dat2 = <ResponseLogin>data;
              if(dat2.Status){
                switch(dat2.Tipo){
                  case "Sucursal":{
                    console.log("Este es el tipo desde sidenav" + dat2.Tipo)
                    console.log(this.returnUrl+'m-subsidiary/'+dat2.Dominio);
                    this.router.navigate([this.returnUrl+'m-subsidiary']);
                    this.loginService.updatedUser(dat2);
                    this.isShownS=true
                    this.isShownO=false
                    this.isShownF=false
                    break;
                  }
                  case "Fabrica":{
                    this.router.navigate([this.returnUrl+'m-factory']);
                    this.loginService.updatedUser(dat2);
                    this.isShownF=true
                    this.isShownS=false
                    this.isShownO=false
                    break;
                  }
                  case "Admin":{
                    this.router.navigate([this.returnUrl+'m-owner']);
                    this.loginService.updatedUser(dat2);
                    this.isShownO=true
                    this.isShownS=false
                    this.isShownF=false
                    break;
                  }
                  default:{
                    alert("Error");
                    window.location.reload();
                  }
                }
              }else{
                alert("Error");
                window.location.reload();
              }
              // this.router.navigate([this.returnUrl]);
            });
}

  verificar(){
    /* 
    var myInput:any = this.loginService.getAccountType;
    console.log("Desde sidenav: " + this.loginService.accountType)

    if (myInput.value == "Sucursal") {
         this.isShownS=true
         this.isShownO=false
         this.isShownF=false
    }
    else if (myInput.value == "Admin") {
      this.isShownO=true
      this.isShownS=false
      this.isShownF=false
    }
    else if (myInput.value == "Fabrica") {
      this.isShownF=true
      this.isShownS=false
      this.isShownO=false
    }

    else{
      this.isShownF=false
      this.isShownS=false
      this.isShownO=false
    }*/
  }  

}
