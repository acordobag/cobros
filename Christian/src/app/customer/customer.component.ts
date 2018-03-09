import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Customer } from '../entities';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

  constructor(private http: Http) { }

  ngOnInit(): void {
    this.createNewCustomer();
    this.updatedCustomerList();
    this.http.get('http://10.0.0.12:8000/api/location')
      .map(res => res.json())
      .subscribe(res => {
        this.locations = res;
      });
  }

  ngAfterViewInit(): void {
  }

  createDataTable(): void {
    $("#customerTable").DataTable({
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
    this.http.get('http://10.0.0.12:8000/api/customer')
      .map(res => res.json())
      .subscribe(res => {
        this.customers = res;
        setTimeout(() => {
          this.createDataTable();
        }, 300)
      });
  }

  createNewCustomer(): void {
    this.customer = new Customer();
  }

  saveCreatedUser() {
    this.http.post('http://10.0.0.12:8000/api/customer', this.customer)
      .map(res => { res.json() })
      .subscribe(res => {
        location.reload();
      })
  }

  compareFn(i1, i2) {
    return i1 && i2 ? i1.id === i2.id : i1 === i2;
  }
}
