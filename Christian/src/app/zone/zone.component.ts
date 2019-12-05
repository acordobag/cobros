import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer, Zone } from '../entities';
import { HttpService } from '../services/http.service';
import { CtTableComponent } from '../controls/ct-table/ct-table.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {

  @ViewChild(CtTableComponent)
  table: CtTableComponent;
  
  @ViewChild('newZone') newZone: ModalDirective;
  @ViewChild('form') form: NgForm;
  private zones: Zone[];
  private customers: Customer[];
  private zone: Zone;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.createNewZone();
    this.updateLocationList();
    this.table.id = "locationsTable";
    this.table.columns = { id: 'Id', name: 'Nombre'};
  }

  updateLocationList() {
    this.http.get('zone', res => {
      this.zones = res;
      this.table.data = this.zones;
      this.table.rerender();
    });

  }

  createNewZone() {
    this.form.resetForm();
    this.zone = new Zone();
  }

  saveCreatedZone() {
    this.newZone.hide();
    this.http.post('zone', this.zone, res => {
      this.updateLocationList();
    })
  }

}
