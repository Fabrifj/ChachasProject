import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-factory',
  templateUrl: './m-factory.component.html',
  styleUrls: ['./m-factory.component.css']
})
export class MFactoryComponent implements OnInit {

  constructor() { }
  showVariable : boolean = true; 
  ngOnInit(): void {

  }
  click(){
    this.showVariable =! this.showVariable
    console.log(this.showVariable)
  }
t(): void {
  }

}
