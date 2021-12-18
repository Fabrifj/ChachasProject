import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseLogin } from 'src/app/models/responseLogin.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router,) { }

  user:string ="";
  state:string="Logout";
  accountType:string="";

  updatedUser(response:ResponseLogin){
    this.user = response.Dominio;
    this.accountType =response.Tipo;
    this.state = "Login";
  }

  getUser(){
    return this.user;
  }
  
  getAccountType(){
    return this.accountType; 
  }
  getStatus(){
    return this.state;
  }
  logOut(){
    this.user = "";
    this.accountType = "";
    this.state = "Logout"
    this.router.navigate(['/']);

  }
}
