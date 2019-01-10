import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Account, Customer, PaymentTerm, Payment, Btn } from '../entities';
import { NgForm, FormControl, NgModel } from '@angular/forms';
import { CtTableComponent } from '../controls/ct-table/ct-table.component';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  @ViewChild(CtTableComponent)
  table: CtTableComponent;

  private accounts: Account[];
  private account: Account;
  private customers: Customer[];
  private paymentTerms: PaymentTerm[];
  private payment: Payment;
  private selectedAccount: Account;
  private today: Date;

  @ViewChild('formAccount') formAccount: NgForm;
  @ViewChild('formPayment') formPayment: NgForm;
  @ViewChild('newUserAccount') newUserAccount: ModalDirective;

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.today = new Date();
    this.payment = new Payment();
    this.updatedAccountList();
    this.loadComboBoxes();
    this.createNewAccount();
    this.table.columns = { id: 'ID', name: 'Articulo', initialAmmount: 'Monto inicial', charge: 'Cuota' };
    this.table.currecyColumns = { initialAmmount: 'Monto inicial', charge: 'Cuota' }
    this.table.id = "accountsTable";
    this.table.btn = new Btn('Detalle');
  }

  updatedAccountList() {
    this.http.get('account', res => {
      this.accounts = res;
      this.table.data = this.accounts;
      this.table.rerender();
    });
  }

  createNewAccount() {
    this.formAccount.resetForm();
    this.account = new Account();
  }

  createNewPayment(id) {
    this.http.get('account/' + id, res => {
      this.selectedAccount = res;
      this.formAccount.resetForm();
      this.payment = new Payment();
      this.payment.account.id = this.selectedAccount.id;
      this.payment.ammount = this.selectedAccount.charge;
      this.payment.user = JSON.parse(localStorage.getItem('currentUser'));
    });
  }

  loadComboBoxes() {
    this.http.get('customer', (res: Customer[]) => {
      this.customers = res;
    });
    this.http.get('paymentTerm', res => {
      this.paymentTerms = res;
    });
  }

  saveCreatedAccount() {
    this.newUserAccount.hide();
    this.account.initialAmmount = this.account.charge * this.account.numberOfPayments;
    this.account.actualAmmount = this.account.initialAmmount;
    this.http.post('account', this.account, res => {
      this.updatedAccountList();
    });
  }

  rowClick(id): void {
    this.router.navigate(['home/account', id]);
  }

  saveCreatedPayment() {
    this.http.post('payment', this.payment, res => {
      this.updatedAccountList();
    });
  }

  compareFn(i1, i2) {
    return i1 && i2 ? i1.id === i2.id : i1 === i2;
  }

  setCustomer(data) {
    this.account.customer = data.item;
  }

}
