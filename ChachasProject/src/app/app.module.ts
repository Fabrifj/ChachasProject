import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './shared-modules/catalog/catalog.component';
import { VentaComponent } from './shared-modules/venta/venta.component';
import { SubMenuComponent } from './shared-modules/sub-menu/sub-menu.component';
import { SalesComponent } from './shared-modules/sales/sales.component';
import { HomeComponent } from './modules/home/home.component';
import { SubsidiaryComponent } from './modules/subsidiary/subsidiary.component';
import { FactoryComponent } from './modules/factory/factory.component';
import { AdmiComponent } from './modules/admi/admi.component';
import { LoginComponent } from './modules/login/login.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { FooterComponent } from './modules/footer/footer.component';
import { ProducInventoryComponent } from './shared-modules/produc-inventory/produc-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    VentaComponent,
    SubMenuComponent,
    SalesComponent,
    HomeComponent,
    SubsidiaryComponent,
    FactoryComponent,
    AdmiComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    ProducInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
