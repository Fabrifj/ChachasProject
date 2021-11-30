import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientInfoModel } from 'src/app/models/purchase.model';
import { SalesService } from '../sales.service';


@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {

  dataClientForm: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private salesService: SalesService
  )
  {
    this.dataClientForm = this._builder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      nit: ['', Validators.required],
      number: ['', Validators.required],
            
      })
  }

  get f() { return this.dataClientForm.controls; }

  sendData(values: any){
      console.log(values)
  }

  ngOnInit(): void {
  }
  sendPurchase(){
    let name = this.dataClientForm.controls['name'].value;
    let lastName = this.dataClientForm.controls['lastName'].value;
    let email = this.dataClientForm.controls['email'].value;
    let nit = this.dataClientForm.controls['nit'].value;
    let number = this.dataClientForm.controls['number'].value;
    let clientInfo :ClientInfoModel = { Name:name,LastName:lastName,Email:email,Nit:nit,Number:number};

    this.salesService.makePurchase(clientInfo);
  }

}
