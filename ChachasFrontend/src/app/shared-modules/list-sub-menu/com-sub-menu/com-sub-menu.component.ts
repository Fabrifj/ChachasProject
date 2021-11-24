import { Component, Input, OnInit } from '@angular/core';
import { RutaTituloModel } from 'src/app/models/rutaTitulo.model';

@Component({
  selector: 'app-com-sub-menu',
  templateUrl: './com-sub-menu.component.html',
  styleUrls: ['./com-sub-menu.component.css']
})
export class ComSubMenuComponent implements OnInit {
  @Input() subTitulo: RutaTituloModel|any;
  @Input() index: number=0;
  constructor() { }

  ngOnInit(): void {
  }

}
