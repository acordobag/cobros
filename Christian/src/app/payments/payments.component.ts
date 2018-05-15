import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Payment } from '../entities';

declare var $: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  private table: any;
  private payments: Payment[];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.updatedPaymentList()
  }

  updatedPaymentList() {
    this.http.get('payment', res => {
      this.payments = res;
      setTimeout(() => {
        this.createDataTable();
      })
    });
  }

  createDataTable() {
    this.table = $('#paymentsTable').DataTable({
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
    /*     var self = this;
        this.table.on('select', function (e, dt, type, indexes) {
          if (type === 'row') {
            var data = self.table.rows({ selected: true }).data();
            self.http.get('account/' + data[0][0], res => {
              self.selectedAccount = res;
              self.createNewPayment();
            });
          }
        }); */
  }

  approveOnePayment(p: Payment) {
    this.http.post('approveOnePayment', p, res => {
      location.reload();
    });
  }

  approveAllPayments() {
    this.http.post('approveListOfPayment', { payments: this.payments }, res => {
      location.reload();
    });
  }
}
