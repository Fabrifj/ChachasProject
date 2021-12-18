import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  constructor() { }
  value:number=0;
  ngOnInit(): void {
  }
  acceptClientLocation(){

  }
  radioChange(event:MatRadioChange){
    console.log(event.value);
    this.value = event.value;
  }
}
