import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {CatalogComponent} from '../../shared-modules/catalog/catalog.component'
import { ModalService } from 'src/app/shared-modules/modal/modal.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fecha: any;
  today = new Date;
  
  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  
  constructor(public modalService:ModalService) { }
  

  ngOnInit(): void {
    this.fecha = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
  }
  

   verificar(){
    var myInput:any = document.getElementById("tipo");
  } 

}

