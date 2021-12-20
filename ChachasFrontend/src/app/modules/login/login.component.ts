import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpService } from 'src/app/core-modules/app-http.service';
import { ResponseLogin } from 'src/app/models/responseLogin.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup ;
  loading = false;
  submitted = false;
  returnUrl: string ="";
  
  constructor(
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

 
  ngOnInit() {
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
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
                      console.log("Este es el tipo " + dat2.Tipo)
                      console.log(this.returnUrl+'m-subsidiary/'+dat2.Dominio);
                      this.router.navigate([this.returnUrl+'m-subsidiary']);
                      this.loginService.updatedUser(dat2);
                      break;
                    }
                    case "Fabrica":{
                      this.router.navigate([this.returnUrl+'m-factory']);
                      this.loginService.updatedUser(dat2);
                      break;
                    }
                    case "Admin":{
                      this.router.navigate([this.returnUrl+'m-owner']);
                      this.loginService.updatedUser(dat2);
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

}
