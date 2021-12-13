import { Component, OnInit } from '@angular/core';
import * as ver from '../home/home.component';
import { ModalService } from 'src/app/shared-modules/modal/modal.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public modalService:ModalService) { }
  //let tipo = new HomeComponent(); 
  isShownS:boolean=false;
  isShownO:boolean=false;
  isShownF:boolean=false;
  ngOnInit(): void {
  
    
  }

  verificar(){
    
    var myInput:any = document.getElementById("tipo");

    if (myInput.value == "s") {
         this.isShownS=true
         this.isShownO=false
         this.isShownF=false
    }
    else if (myInput.value == "o") {
      this.isShownO=true
      this.isShownS=false
      this.isShownF=false
    }
    else if (myInput.value == "f") {
      this.isShownF=true
      this.isShownS=false
      this.isShownO=false
    }

    else{
      this.isShownF=false
      this.isShownS=false
      this.isShownO=false
    }
  } 

}
