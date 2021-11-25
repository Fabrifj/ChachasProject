import { FactoryTarget } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { MFactoryComponent } from './modules/management/m-factory/m-factory.component';
import { MOwnerComponent } from './modules/management/m-owner/m-owner.component';
import { MSubsidiaryComponent } from './modules/management/m-subsidiary/m-subsidiary.component';

import { ProducInventoryComponent } from './shared-modules/produc-inventory/produc-inventory.component';
import { SalesComponent } from './shared-modules/sales/sales.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'm-subsidiary', 
    component: MSubsidiaryComponent,
    children:[
      
    ]
  },
  {
    path: 'm-owner', 
    component: MOwnerComponent,
    children:[
      
    ]
  },
  {
    path: 'm-factory', 
    component: MFactoryComponent,
    children:[
      
    ]
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
