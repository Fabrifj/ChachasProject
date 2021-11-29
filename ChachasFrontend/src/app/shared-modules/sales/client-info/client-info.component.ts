import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {

  dataClientForm: FormGroup;

    constructor(
        private _builder: FormBuilder
    ){
        this.dataClientForm = this._builder.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([Validators.email, Validators.required])],
            number: ['', Validators.required]
        })
    }

    get f() { return this.dataClientForm.controls; }

    sendData(values: any){
        console.log(values)
    }
    
  ngOnInit(): void {
  }

}
