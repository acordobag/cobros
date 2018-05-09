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
import { Options } from 'selenium-webdriver/ie';
import { LocationComponent } from './location/location.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TypeaheadModule, BsDatepickerModule } from 'ngx-bootstrap';
import { PaymentsComponent } from './payments/payments.component';


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
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgxMaskModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [GuardService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
