import { Component, OnInit, ViewChild } from '@angular/core';
import { CtTableComponent } from '../controls/ct-table/ct-table.component';
import { Btn, Route } from '../entities';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  @ViewChild('routesTable')
  table: CtTableComponent;
  private routes: Route[];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.updatePaymentList();
    this.table.columns = { id: 'ID', name: 'Ruta', desStatus: 'Estado', driverName: 'Conductor' };
    this.table.id = "routesTable";
    this.table.btn = new Btn('Detalle');
  }

  updatePaymentList() {
    this.http.get('routes', res => {
      this.routes = res;
      this.table.data = this.routes;
      this.table.rerender();
    });
  }

}
