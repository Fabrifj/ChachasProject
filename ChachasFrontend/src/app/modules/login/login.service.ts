import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  user:string ="";
  state:string="";
  accountType:string="";

  updatedUser(){
    this.user;
    this.accountType;
    this.state = "Login";
  }
  getUser(){
    return this.user;
  }
  
  getAccountType(){
    return this.accountType; 
  }
}
