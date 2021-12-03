import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';

import { MFactoryComponent } from './modules/management/m-factory/m-factory.component';
import { MOwnerComponent } from './modules/management/m-owner/m-owner.component';
import { MSubsidiaryComponent } from './modules/management/m-subsidiary/m-subsidiary.component';


import { CatalogComponent } from './shared-modules/catalog/catalog.component';
import { ProducInventoryComponent } from './shared-modules/produc-inventory/produc-inventory.component';
import { ClientInfoComponent } from './shared-modules/sales/client-info/client-info.component';
import { DisplayOrderInfoComponent } from './shared-modules/sales/display-order-info/display-order-info.component';
import { SalesComponent } from './shared-modules/sales/sales.component';
import { ModalComponent } from './shared-modules/modal/modal.component';



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
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
      {path: 'managment', component: ProducInventoryComponent},
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
