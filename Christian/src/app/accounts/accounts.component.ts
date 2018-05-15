import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Account, Customer, PaymentTerm, Payment } from '../entities';
import { NgForm, FormControl, NgModel } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  private table: any;
  private accounts: Account[];
  private account: Account;
  private customers: Customer[];
  private paymentTerms: PaymentTerm[];
  private payment: Payment;
  private selectedAccount: Account;
  private today: Date;

  @ViewChild('formAccount') formAccount: NgForm;
  @ViewChild('formPayment') formPayment: NgForm;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.today = new Date();
    this.payment = new Payment();
    this.updatedAccountList();
    this.loadComboBoxes();
    this.createNewAccount();
  }

  createDataTable() {
    this.table = $('#accountsTable').DataTable({
      responsive: true,
      select: true,
      "columnDefs": [
        {
          "targets": [0],
          "visible": false,
          "searchable": false
        }
      ],
      language: {
        "info": "Mostrando pagina _PAGE_ de _PAGES_",
        "infoEmpty": "No hay registros disponibles",
        "lengthMenu": "Mostrando _MENU_ registros por pagina ",
        "paginate": {
          "first": "First",
          "last": "Last",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      }
    });
  }

  updatedAccountList() {
    this.http.get('account', res => {
      this.accounts = res;
      setTimeout(() => {
        this.createDataTable();
      })
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
    this.account.initialAmmount = this.account.charge * this.account.numberOfPayments;
    this.account.actualAmmount = this.account.initialAmmount;
    this.http.post('account', this.account, res => {
      location.reload();
    });
  }

  saveCreatedPayment() {
    this.http.post('payment', this.payment, res => {
      location.reload();
    });
  }

  compareFn(i1, i2) {
    return i1 && i2 ? i1.id === i2.id : i1 === i2;
  }

  setCustomer(data) {
    this.account.customer = data.item;
  }

}
