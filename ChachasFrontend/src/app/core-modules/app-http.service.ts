import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import paths from '../core-modules/config.json';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {


  constructor(private http: HttpClient ) { }

  getProductListHttp(){
    return this.http.get(paths.test);
  }
  postPurchase(purchase:any){
    this.http.post(paths.test, purchase)
  }
}
