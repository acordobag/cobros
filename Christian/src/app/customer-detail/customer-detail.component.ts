import { Component, OnInit } from '@angular/core';
import { Customer, Account, PaymentTerm } from '../entities';
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
  private paymentTerms: Array<PaymentTerm>;

  constructor(private route: ActivatedRoute, private http: HttpService) {
    this.customer = new Customer();
    this.locations = new Array<Location>();
  }

  ngOnInit() {
    this.disableInputs();
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
          $('#accountsTable').DataTable({
            responsive: true,
            select: true,
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
        });
      });
    });
  }

  disableInputs(){
    $('#customerForm').each(()=>{
      $(this).prop('readonly', true);
    });
  }
  createNewAccount() {
    this.account = new Account();
    this.account.customerId = this.customer.id;
  }

  saveCreatedAccount() {
    this.account.initialAmmount = this.account.charge * this.account.numberOfPayments;
    this.account.actualAmmount = this.account.initialAmmount;
    this.http.post('account', this.account, res => {
      location.reload();
    })
  }

  compareFn(i1, i2) {
    return i1 && i2 ? i1.id === i2.id : i1 === i2;
  }

}
