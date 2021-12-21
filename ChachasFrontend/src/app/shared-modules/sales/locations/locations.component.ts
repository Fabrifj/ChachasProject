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


  prLat = "";
  prLon = "";
  zoom=4;
  
  latitude:any="-16.5";
  longitude:any="-68.15";

  marker:any = {};
  ngOnInit(): void {
  }
  acceptClientLocation(){

  }
  radioChange(event:MatRadioChange){
    console.log(event.value);
    this.value = event.value;
  }

  clickReadyMap(map: google.maps.Map){

    
    map.addListener('click',(e: google.maps.MouseEvent)=>{

      this.check(e.latLng,map);
      var position = JSON.parse(JSON.stringify(e.latLng.toJSON()));
     
      this.prLat = position.lat;
      this.prLon = position.lng;
      console.log(this.prLat);
      console.log(this.prLon);
    })
    


  }

  check(latLng: google.maps.LatLng , map: google.maps.Map){
   
    var mapMarkers:any;
    console.log(this.marker);
    this.marker = null;


    var marker2 = new google.maps.Marker({
      
      position: latLng,
      map:map,


    });
    
    this.marker = marker2;
    map.panTo(latLng);
   
  }
}
