import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer, Location } from '../entities';
import { HttpService } from '../services/http.service';
import { CtTableComponent } from '../controls/ct-table/ct-table.component';

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

  private locations: Location[];
  private customers: Customer[];
  private location: Location;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.createNewLocation();
    this.updateLocationList();
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
    this.location = new Location();
  }

  saveCreatedLocation() {
    this.http.post('location', this.location, res => {
      this.updateLocationList();
    })
  }

}
