import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
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
    component: HomeComponent,
    canActivate: [GuardService],
    children: [
      { path: "customers", component: CustomerComponent },
      { path: "customer/:id", component: CustomerDetailComponent },
      { path: "locations", component: LocationComponent },
      { path: "accounts", component: AccountsComponent },
      { path: "account/:id", component: AccountDetailComponent },
      { path: "payments", component: PaymentsComponent }
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
