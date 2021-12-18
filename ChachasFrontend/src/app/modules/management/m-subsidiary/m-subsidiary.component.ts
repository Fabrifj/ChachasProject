import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-subsidiary',
  templateUrl: './m-subsidiary.component.html',
  styleUrls: ['./m-subsidiary.component.css']
})
export class MSubsidiaryComponent implements OnInit {

  constructor() { }
  showVariable : boolean = true; 
  ngOnInit(): void {

  }
  click(){
    this.showVariable =! this.showVariable
    console.log(this.showVariable)
  }

}
