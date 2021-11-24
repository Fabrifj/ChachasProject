import { Component, Input, OnInit } from '@angular/core';
import { RutaTituloModel } from 'src/app/models/rutaTitulo.model';

@Component({
  selector: 'app-list-sub-menu',
  templateUrl: './list-sub-menu.component.html',
  styleUrls: ['./list-sub-menu.component.css']
})
export class ListSubMenuComponent implements OnInit {

  @Input() listProducts: RutaTituloModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
