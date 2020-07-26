import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer, Account, PaymentTerm, Payment, Zone, Btn, Address } from '../entities';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import * as CONFIG from '../Settings/app.config';
import { CtTableComponent } from '../controls/ct-table/ct-table.component';
import { ModalDirective } from 'ngx-bootstrap';

declare var $: any;

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  private customer: Customer;
  private zones: Array<Zone>;
  private account: Account;
  private address: Address;
  private payment: Payment;
  private paymentTerms: Array<PaymentTerm>;
  private btnEditar: string;
  private selectedAccount: Account;
  private table: any;
  private customerId: number;

  private _states;
  private _cities;
  private _streets;

  @ViewChild('addressTable')
  addressTable: CtTableComponent;
  @ViewChild('accountsTable')
  accountsTable: CtTableComponent;
  @ViewChild('newAddress') newAddress: ModalDirective;
  @ViewChild('newAccount') newAccount: ModalDirective;

  constructor(private route: ActivatedRoute, private http: HttpService, private router: Router) {
    this.customer = new Customer();
    this.zones = new Array<Zone>();
  }

  ngOnInit() {
    //Tables initialization
    //Addresses
    this.addressTable.id = "addressTable";
    this.addressTable.columns = { id: 'Id',state: 'Provincia', city: 'Cantón', street: 'Distrito' };
    this.addressTable.btn = new Btn('Detalle');
    //Accounts
    this.accountsTable.id = "accountsTable";
    this.accountsTable.columns = { id: 'Id', name: 'Artículo', initialAmmount: 'Precio', actualAmmount: 'Saldo', charge: 'Monto cuota', numberOfPayments: 'Nº Cuotas', };
    this.accountsTable.currecyColumns = { initialAmmount: 'Precio', actualAmmount: 'Saldo', charge: 'Monto cuota' }
    this.accountsTable.btn = new Btn('Detalle');

    this.btnEditar = "Editar";
    this.changeInputsState(true);
    this.createNewAccount();
    this.createNewAddress();
    this.http.get('zone', res => {
      this.zones = res;
    });
    this.http.get('paymentTerm', res => {
      this.paymentTerms = res;
    });

    this.http.get('https://ubicaciones.paginasweb.cr/provincias.json', res => {
      this._states = Object.values(res);
    }, true);

    this.route.params.subscribe(params => {
      this.customerId = +params['id'];
      this.loadCustomerData();
    });
  }

  loadCustomerData(): void {
    this.http.get('customer/' + this.customerId, res => {
      this.customer = res;
      this.addressTable.data = this.customer.addresses;
      this.addressTable.rerender();
      this.accountsTable.data = this.customer.accounts;
      this.accountsTable.rerender();
    });
  }

  changeInputsState(v: boolean): void {
    $('#customerForm :input').prop('disabled', v);
  }

  createNewAccount() {
    this.account = new Account();
    this.account.customer = this.customer;
  }

  createNewAddress() {
    this.address = new Address();
    this.address.customer = this.customer;
  }

  createNewPayment() {
    this.payment = new Payment();
    // this.payment.accountId= this.
  }

  saveCreatedAccount() {
    this.account.initialAmmount = this.account.charge * this.account.numberOfPayments;
    this.account.actualAmmount = this.account.initialAmmount;
    this.http.post('account', this.account, res => {
      this.newAccount.hide();
      this.loadCustomerData();
    });
  }

  saveCreatedAddress() {
    this.http.post('address', this.address, res => {
      this.newAddress.hide();
      this.loadCustomerData();
    });
  }

  editCustomer() {
    if (this.btnEditar == "Editar") {
      this.btnEditar = "Guardar";
      this.changeInputsState(false);
      //Update Method
    } else {
      this.btnEditar = "Editar";
      this.changeInputsState(true);
    }
  }

  accountClick(id): void {
    this.router.navigate(['home/account', id]);
  }


  stateChange(){
    this.http.get(`https://ubicaciones.paginasweb.cr/provincia/${this._states.indexOf(this.address.state)+1}/cantones.json`, res => {
      this._cities = Object.values(res);
    }, true);
  }

  cityChange(){
    this.http.get(`https://ubicaciones.paginasweb.cr/provincia/${this._states.indexOf(this.address.state)+1}/canton/${this._cities.indexOf(this.address.city)+1}/distritos.json`, res => {
      this._streets = Object.values(res);
    }, true);
  }

  compareFn(i1, i2) {
    return i1 && i2 ? i1.id === i2.id : i1 === i2;
  }

}
