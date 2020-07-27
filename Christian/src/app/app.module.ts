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
import { ZoneComponent } from './zone/zone.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TypeaheadModule, BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { PaymentsComponent } from './payments/payments.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { ControlsModule } from './controls/controls.module';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { UtilService } from './services/util.service';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ".",
  precision: 2,
  prefix: "₡",
  suffix: "",
  thousands: ","
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CustomerComponent,
    LoginComponent,
    HomeComponent,
    CustomerDetailComponent,
    ZoneComponent,
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
    CurrencyMaskModule,
    NgxMaskModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    McBreadcrumbsModule.forRoot()

  ],
  providers: [GuardService, HttpService,{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
