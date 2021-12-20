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
import { MfInventaryComponent } from './modules/management/m-factory/mf-inventary/mf-inventary.component';
import {MatRadioModule} from '@angular/material/radio';

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
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './modules/header/header.component';
import { SidenavComponent } from './modules/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';


import { DisplayOrderInfoComponent } from './shared-modules/sales/display-order-info/display-order-info.component';
import { CatalogCardComponent } from './shared-modules/catalog/catalog-card/catalog-card.component';

import { ClientInfoComponent } from './shared-modules/sales/client-info/client-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHttpService } from './core-modules/app-http.service';
import { LocationsComponent } from './shared-modules/sales/locations/locations.component';
import { MFactoryComponent } from './modules/management/m-factory/m-factory.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { MfiSalesComponent } from './modules/management/m-factory/mf-inventary/mfi-sales/mfi-sales.component';
import { SalesListComponent } from './modules/management/m-factory/mf-inventary/mfi-sales/sales-list/sales-list.component';
import { ShowIngredientsComponent } from './modules/management/m-factory/mf-inventary/mfi-sales/show-ingredients/show-ingredients.component';
import { ListIngredientsComponent } from './modules/management/m-factory/mf-inventary/mfi-sales/show-ingredients/list-ingredients/list-ingredients.component';

import { MoArqueoComponent } from './modules/management/m-owner/mo-arqueo/mo-arqueo.component';
import { MoEmpleadosComponent } from './modules/management/m-owner/mo-empleados/mo-empleados.component';
import { MoSucursalesComponent } from './modules/management/m-owner/mo-sucursales/mo-sucursales.component';



import {  MatRadioModule} from '@angular/material/radio';
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
    MfInventaryComponent,
    MFactoryComponent,
    ReusableTableComponent,
    DisplayOrderInfoComponent,
    CatalogCardComponent,
    ClientInfoComponent,

    MfiSalesComponent,
    SalesListComponent,
    ShowIngredientsComponent,
    ListIngredientsComponent,

    LocationsComponent,
    MoArqueoComponent,
    MoEmpleadosComponent,
    MoSucursalesComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
    CommonModule,
    HttpClientModule,
    MatRadioModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyDdHDplMzz8rBW2mzx2OWoUAZk4am-dB9I",
      libraries: ['places']
    }),
    // provideFirebaseApp(() => initializeApp(environment)),
    // provideFirestore(() => getFirestore())
  ],
  
  exports:[CatalogCardComponent],

  providers: [AppHttpService],

  bootstrap: [AppComponent]
})
export class AppModule { }
