import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { Customer, Btn } from '../entities';
import 'rxjs/add/operator/map';
import { HttpService } from '../services/http.service';
import { ModalDirective } from 'ngx-bootstrap';
import { CtTableComponent } from '../controls/ct-table/ct-table.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit {

  @ViewChild(CtTableComponent)
  table: CtTableComponent;

  @ViewChild('newUser') newUser: ModalDirective;
  @ViewChild('form') form: NgForm;
  private customers: Customer[];
  private customer: Customer;
  private locations: Location[];

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.customer = new Customer();
    this.updatedCustomerList();
    this.http.get('location', res => {
      this.locations = res;
    });
    this.table.id = "customerTable";
    this.table.columns = { citizenId: 'Cédula', fullName: 'Nombre', phone: 'Teléfono', email: 'Email' };
    this.table.btn = new Btn('Detalle');
  }

  ngAfterViewInit(): void {
  }

  updatedCustomerList() {
    this.http.get('customer', res => {
      this.customers = res;
      this.table.data = this.customers;
      this.table.rerender();
    });
  }

  createNewCustomer(): void {
    this.form.resetForm();
    this.customer = new Customer();
  }

  rowClick(id): void{
    this.router.navigate(['home/customer', id]);
  }

  saveCreatedUser() {
    this.newUser.hide();
    this.customer.fullName = this.customer.name + " " + this.customer.lastName;
    this.http.post('customer', this.customer, res => {
      this.updatedCustomerList()
    })
  }

  compareFn(i1, i2) {
    return i1 && i2 ? i1.id === i2.id : i1 === i2;
  }
}
