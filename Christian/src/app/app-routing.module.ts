import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GuardService } from './guards/guard.service';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { LocationComponent } from './location/location.component';
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
          { path: ":id", component: CustomerDetailComponent, data: { breadcrumbs: true, text: "{{params['id']}}" } }
        ]
      },
      {
        path: "account", data: { breadcrumbs: true, text: 'Cuentas' }, children: [
          { path: "", component: AccountsComponent },
          { path: ":id", component: AccountDetailComponent, data: { breadcrumbs: true, text: 'cuenta' } }
        ]
      },
      { path: "location", component: LocationComponent, data: { breadcrumbs: true, text: 'Localizaciones' } },
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
