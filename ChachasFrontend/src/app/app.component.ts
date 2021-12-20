import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChachasProject';
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

  sideBarOpen = true;
  ngOnInit() {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
