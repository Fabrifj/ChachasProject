import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { CatalogComponent } from './shared-modules/catalog/catalog.component';
import { SalesComponent } from './shared-modules/sales/sales.component';
import { LoginComponent } from './modules/login/login.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { FooterComponent } from './modules/footer/footer.component';
import { ProducInventoryComponent } from './shared-modules/produc-inventory/produc-inventory.component';
import { ListSubMenuComponent } from './shared-modules/list-sub-menu/list-sub-menu.component';
import { ModalComponent } from './shared-modules/modal/modal.component';
import { ReusableTableComponent } from './shared-modules/reusable-table/reusable-table.component';
import { ComSubMenuComponent } from './shared-modules/list-sub-menu/com-sub-menu/com-sub-menu.component';
import { MSubsidiaryComponent } from './modules/management/m-subsidiary/m-subsidiary.component';
import { MsInventaryComponent } from './modules/management/m-subsidiary/ms-inventary/ms-inventary.component';
import { MfSubsidiaryComponent } from './modules/management/m-factory/mf-subsidiary/mf-subsidiary.component';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './modules/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';



import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './modules/header/header.component';
import { SidenavComponent } from './modules/sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    SalesComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    NavbarComponent,
    SidenavComponent,
    FooterComponent,
    ProducInventoryComponent,
    ListSubMenuComponent,
    ComSubMenuComponent,
    ModalComponent,
    
    MSubsidiaryComponent,
    MsInventaryComponent,
    MfSubsidiaryComponent,
    ReusableTableComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
