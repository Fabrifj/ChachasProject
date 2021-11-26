import { FactoryTarget } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmiComponent } from './modules/admi/admi.component';
import { FactoryComponent } from './modules/factory/factory.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { SubsidiaryComponent } from './modules/subsidiary/subsidiary.component';
import { ProducInventoryComponent } from './shared-modules/produc-inventory/produc-inventory.component';
import { SalesComponent } from './shared-modules/sales/sales.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'subsidiary', 
    component: SubsidiaryComponent,
    children:[
      {path: 'sales', component: SalesComponent},
      {path: 'managment', component: ProducInventoryComponent},
    ]
  },
  {
    path: 'administration', 
    component: AdmiComponent,
    children:[
      {path: 'sales', component: SalesComponent},
      {path: 'managment', component: ProducInventoryComponent},
    ]
  },
  {
    path: 'factory', 
    component: FactoryComponent,
    children:[
      {path: 'sales', component: SalesComponent},
      {path: 'managment', component: ProducInventoryComponent},
    ]
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
