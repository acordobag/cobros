import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GuardService } from './guards/guard.service';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ZoneComponent } from './zone/zone.component';
import { AccountsComponent } from './accounts/accounts.component';
import { PaymentsComponent } from './payments/payments.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "home",
    component: HomeComponent, canActivate: [GuardService], data: { breadcrumbs: true, text: 'Inicio' },
    children: [
      {
        path: 'customer', data: { breadcrumbs: true, text: 'Clientes' }, children: [
          { path: "", component: CustomerComponent },
          { path: ":id", component: CustomerDetailComponent, data: { breadcrumbs: true, text: "cliente" } }
        ]
      },
      {
        path: "account", data: { breadcrumbs: true, text: 'Cuentas' }, children: [
          { path: "", component: AccountsComponent },
          { path: ":id", component: AccountDetailComponent, data: { breadcrumbs: true, text: 'cuenta' } }
        ]
      },
      { path: "zone", component: ZoneComponent, data: { breadcrumbs: true, text: 'Zonas' } },
      { path: "payment", component: PaymentsComponent, data: { breadcrumbs: true, text: 'Pagos' } }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: []
})
export class AppRoutingModule { }
