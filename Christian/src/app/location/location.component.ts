import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer, Location } from '../entities';
import { HttpService } from '../services/http.service';
import { CtTableComponent } from '../controls/ct-table/ct-table.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @ViewChild(CtTableComponent)
  table: CtTableComponent;
  
  @ViewChild('newLocation') newLocation: ModalDirective;
  @ViewChild('form') form: NgForm;
  private locations: Location[];
  private customers: Customer[];
  private location: Location;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.createNewLocation();
    this.updateLocationList();
    this.table.id = "locationsTable";
    this.table.columns = { id: 'Id', name: 'Nombre'};
  }

  updateLocationList() {
    this.http.get('location', res => {
      this.locations = res;
      this.table.data = this.locations;
      this.table.rerender();
    });

  }

  createNewLocation() {
    this.form.resetForm();
    this.location = new Location();
  }

  saveCreatedLocation() {
    this.newLocation.hide();
    this.http.post('location', this.location, res => {
      this.updateLocationList();
    })
  }

}
