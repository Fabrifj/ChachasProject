import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './shared-modules/catalog/catalog.component';
import { SalesComponent } from './shared-modules/sales/sales.component';
import { HomeComponent } from './modules/home/home.component';

import { LoginComponent } from './modules/login/login.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { FooterComponent } from './modules/footer/footer.component';
import { ProducInventoryComponent } from './shared-modules/produc-inventory/produc-inventory.component';
import { ListSubMenuComponent } from './shared-modules/list-sub-menu/list-sub-menu.component';
import { ModalComponent } from './shared-modules/modal/modal.component';
import { ReusableTableComponent } from './shared-modules/reusable-table/resusable-table.component';
import { ComSubMenuComponent } from './shared-modules/list-sub-menu/com-sub-menu/com-sub-menu.component';
import { MSubsidiaryComponent } from './modules/management/m-subsidiary/m-subsidiary.component';
import { MsInventaryComponent } from './modules/management/m-subsidiary/ms-inventary/ms-inventary.component';
import { MfSubsidiaryComponent } from './modules/management/m-factory/mf-subsidiary/mf-subsidiary.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    SalesComponent,
    HomeComponent,
  
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    ProducInventoryComponent,
    ListSubMenuComponent,
    ComSubMenuComponent,
    ModalComponent,
    ReusableTableComponent,
    MSubsidiaryComponent,
    MsInventaryComponent,
    MfSubsidiaryComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
