import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Customer } from '../entities';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../services/http.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit {

  private customers: Customer[];
  private customer: Customer;
  private locations: Location[];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.createNewCustomer();
    this.updatedCustomerList();
    this.http.get('location', res => {
      this.locations = res;
    })
  }

  ngAfterViewInit(): void {
  }

  createDataTable(): void {
    $("#customerTable").DataTable({
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
  }

  updatedCustomerList() {
    this.http.get('customer', res => {
      this.customers = res;
      setTimeout(() => {
        this.createDataTable();
      })
    });
  }

  createNewCustomer(): void {
    this.customer = new Customer();
  }

  saveCreatedUser() {
    this.http.post('customer', this.customer, res => {
      location.reload();
    })
  }

  compareFn(i1, i2) {
    return i1 && i2 ? i1.id === i2.id : i1 === i2;
  }
}
