import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GuardService } from './guards/guard.service';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { HttpService } from './services/http.service';
import { NgxMaskModule } from 'ngx-mask'
import { LocationComponent } from './location/location.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TypeaheadModule, BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { PaymentsComponent } from './payments/payments.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { ControlsModule } from './controls/controls.module';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CustomerComponent,
    LoginComponent,
    HomeComponent,
    CustomerDetailComponent,
    LocationComponent,
    AccountsComponent,
    PaymentsComponent,
    AccountDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ControlsModule,
    HttpModule,
    ControlsModule,
    NgxMaskModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    McBreadcrumbsModule.forRoot()

  ],
  providers: [GuardService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
