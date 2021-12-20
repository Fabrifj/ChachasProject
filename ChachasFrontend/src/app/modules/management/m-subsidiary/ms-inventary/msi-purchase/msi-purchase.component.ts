import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-msi-purchase',
  templateUrl: './msi-purchase.component.html',
  styleUrls: ['./msi-purchase.component.css']
})
export class MsiPurchaseComponent implements OnInit {

  constructor() { }
  @Input() idSubsidiary!:string;
  ngOnInit(): void {
  }

}
