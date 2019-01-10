import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Account, Payment } from '../entities';
import { CtTableComponent } from '../controls/ct-table/ct-table.component';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

declare var $: any;

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  @ViewChild(CtTableComponent) paymentsTable: CtTableComponent;
  @ViewChild('formPayment') formPayment: NgForm;
  @ViewChild('newUserAccount') newUserAccount: ModalDirective;
  @ViewChild('newAccountPayment') newAccountPayment: ModalDirective;

  private account: Account;
  private btnEditar: string;
  private accountId: number;
  private payment: Payment;

  constructor(private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit() {
    this.account = new Account();
    this.payment = new Payment();
    this.btnEditar = "Editar";
    this.changeInputsState(true);
    this.paymentsTable.columns = { id: 'ID', ammount: 'Monto pagado', date: 'Fecha' };
    this.paymentsTable.currecyColumns = { ammount: 'Monto pagado' };
    this.paymentsTable.dateColumns = { date: 'Fecha' };
    this.paymentsTable.id = "paymentsTable";
    this.route.params.subscribe(params => {
      this.accountId = params['id'];
      this.updateComponent();
    });

  }

  updateComponent(): void {
    this.http.get('account/' + this.accountId, res => {
      this.account = res;
      this.paymentsTable.data = this.account.payments;
      this.paymentsTable.rerender();
    });
  }

  changeInputsState(v: boolean): void {
    $('#accountForm :input.editable').prop('disabled', v);
  }

  createNewPayment(id) {
    this.formPayment.resetForm();
    this.payment = new Payment();
    this.payment.account.id = this.account.id;
    this.payment.ammount = this.account.charge;
    this.payment.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  saveCreatedPayment() {
    this.newAccountPayment.hide();
    this.http.post('payment', this.payment, res => {
      this.updateComponent();
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

}
