import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './shared-modules/catalog/catalog.component';
import { SalesComponent } from './shared-modules/sales/sales.component';
import { HomeComponent } from './modules/home/home.component';
import { SubsidiaryComponent } from './modules/subsidiary/subsidiary.component';
import { FactoryComponent } from './modules/factory/factory.component';
import { AdmiComponent } from './modules/admi/admi.component';
import { LoginComponent } from './modules/login/login.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { FooterComponent } from './modules/footer/footer.component';
import { ProducInventoryComponent } from './shared-modules/produc-inventory/produc-inventory.component';
import { ListSubMenuComponent } from './shared-modules/list-sub-menu/list-sub-menu.component';
import { ModalComponent } from './shared-modules/modal/modal.component';
import { ReusableTableComponent } from './shared-modules/reusable-table/resusable-table.component';
import { ComSubMenuComponent } from './shared-modules/list-sub-menu/com-sub-menu/com-sub-menu.component';
import { CommonModule } from '@angular/common';
import { DisplayOrderInfoComponent } from './shared-modules/sales/display-order-info/display-order-info.component';
import { CatalogCardComponent } from './shared-modules/catalog/catalog-card/catalog-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientInfoComponent } from './shared-modules/sales/client-info/client-info.component';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpService } from './core-modules/app-http.service';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    SalesComponent,
    HomeComponent,
    SubsidiaryComponent,
    FactoryComponent,
    AdmiComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    ProducInventoryComponent,
    ListSubMenuComponent,
    ComSubMenuComponent,
    ModalComponent,
    ReusableTableComponent,
    DisplayOrderInfoComponent,
    CatalogCardComponent

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[CatalogCardComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
