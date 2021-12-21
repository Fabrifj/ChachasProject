import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseLogin } from 'src/app/models/responseLogin.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router,) { }
  StatusChanged = new  EventEmitter<string>();

  user:string ="";
  state:string="Logout";
  accountType:string="";

  updatedUser(response:ResponseLogin){
    this.user = response.Dominio;
    this.accountType =response.Tipo;
    this.state = "Login";
    this.StatusChanged.emit(this.getStatus());

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
    this.router.navigate(['/home/catalog']);

    this.StatusChanged.emit(this.getStatus());

  }
}
