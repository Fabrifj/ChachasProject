import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import paths from './config.json';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {


  constructor(private http: HttpClient ) { }

}
