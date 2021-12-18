import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './modules/home/home.component';


import { MSubsidiaryComponent } from './modules/management/m-subsidiary/m-subsidiary.component';


import { CatalogComponent } from './shared-modules/catalog/catalog.component';
import { ClientInfoComponent } from './shared-modules/sales/client-info/client-info.component';
import { DisplayOrderInfoComponent } from './shared-modules/sales/display-order-info/display-order-info.component';
import { SalesComponent } from './shared-modules/sales/sales.component';
import { ModalComponent } from './shared-modules/modal/modal.component';
import { MsInventaryComponent } from './modules/management/m-subsidiary/ms-inventary/ms-inventary.component';
import { ProducInventoryComponent } from './shared-modules/produc-inventory/produc-inventory.component';
import { MFactoryComponent } from './modules/management/m-factory/m-factory.component';
import { LoginComponent } from './modules/login/login.component';
import { MOwnerComponent } from './modules/management/m-owner/m-owner.component';
import { LocationsComponent } from './shared-modules/sales/locations/locations.component';



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home',
    component: HomeComponent,
    children:[
      {path: '', redirectTo: 'catalog', pathMatch: 'full'},
      {path: 'catalog', component: CatalogComponent},
      {path: 'display-order', component: DisplayOrderInfoComponent},
      {path: 'location', component: LocationsComponent},
      {path: 'client-info', component: ClientInfoComponent},
    ] 
  },
  {path: 'login', component: LoginComponent},
  {path: 'modal', component: ModalComponent},
 // {path: '**', pathMatch: 'full', redirectTo: 'modal'},
  {
    path: 'm-subsidiary', 
    component: MSubsidiaryComponent,
    children:[
      {path: '', redirectTo: 'sales', pathMatch: 'full'},
      { 
        path: 'sales', 
        component: SalesComponent,
        children:[
          {path: '', redirectTo: 'catalog', pathMatch: 'full'},
          {path: 'catalog', component: CatalogComponent},
          {path: 'display-order', component: DisplayOrderInfoComponent},
          {path: 'client-info', component: ClientInfoComponent},
        ]
      },
      {path: 'managment', component: MsInventaryComponent},
    ]
  },
  {
    path: 'm-owner', 
    component: MOwnerComponent,

    children:[

      {path: 'managment', component: ProducInventoryComponent},

    ]
  },
  {
    path: 'm-factory', 
    component: MFactoryComponent,
    children:[

      {path: 'managment', component: ProducInventoryComponent},
    ]
  },
  {
    path: 'details', 
    component: DisplayOrderInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
