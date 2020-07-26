import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Payment, Btn } from '../entities';
import { CtTableComponent } from '../controls/ct-table/ct-table.component';

declare var $: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  @ViewChild('paymentsTable')
  table: CtTableComponent;
  private payments: Payment[];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.updatePaymentList();
    this.table.columns = { id: 'ID', customerName:'Cliente', productName: 'Articulo', ammount: 'Monto', date: 'Fecha', driverName: 'Conductor' };
    this.table.currecyColumns = { ammount: 'Monto' }
    this.table.dateColumns = { date: 'Fecha' };
    this.table.id = "authPaymetsTable";
    this.table.btn = new Btn('Autorizar');
  }

  updatePaymentList() {
    this.http.get('payment', res => {
      this.payments = res;
      this.table.data = this.payments;
      this.table.rerender();
    });
  }

  approveOnePayment(id: number) {
    this.http.post('approveOnePayment', { id: id }, res => {
      this.updatePaymentList();
    });
  }

  approveAllPayments() {
    this.http.post('approveListOfPayment', { payments: this.payments }, res => {
      this.updatePaymentList();
    });
  }
}
