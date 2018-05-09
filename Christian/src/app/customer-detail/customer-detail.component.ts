import { Component, OnInit } from '@angular/core';
import { Customer, Account, PaymentTerm, Payment } from '../entities';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

declare var $: any;

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  private customer: Customer;
  private locations: Array<Location>;
  private account: Account;
  private payment: Payment;
  private paymentTerms: Array<PaymentTerm>;
  private btnEditar: string;
  private selectedAccount: Account;
  private table: any;

  constructor(private route: ActivatedRoute, private http: HttpService) {
    this.customer = new Customer();
    this.locations = new Array<Location>();
  }

  ngOnInit() {
    this.btnEditar = "Editar";
    this.changeInputsState(true);
    this.createNewAccount();
    this.http.get('location', res => {
      this.locations = res;
    });
    this.http.get('paymentTerm', res => {
      this.paymentTerms = res;
    });

    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.http.get('customer/' + id, res => {
        this.customer = res;
        setTimeout(() => {
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
          var self = this;
          this.table.on('select', function (e, dt, type, indexes) {
            if (type === 'row') {
              var data = self.table.rows({ selected: true }).data();
              self.http.get('account/' + data[0][0], res => {
                this.selectedAccount = res
              });
            }
          });
        });
      });
    });
  }

  changeInputsState(v: boolean): void {
    $('#customerForm :input').prop('disabled', v);
  }
  createNewAccount() {
    this.account = new Account();
    this.account.customer = this.customer;
  }

  createNewPayment() {
    this.payment = new Payment();
    // this.payment.accountId= this.
  }

  saveCreatedAccount() {
    this.account.initialAmmount = this.account.charge * this.account.numberOfPayments;
    this.account.actualAmmount = this.account.initialAmmount;
    this.http.post('account', this.account, res => {
      location.reload();
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

  compareFn(i1, i2) {
    return i1 && i2 ? i1.id === i2.id : i1 === i2;
  }

}
