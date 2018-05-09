import { Component, OnInit } from '@angular/core';
import { Customer, Location } from '../entities';
import { HttpService } from '../services/http.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  private locations: Location[];
  private customers: Customer[];
  private location: Location;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.createNewLocation();
    this.createDataTable();
  }

  createDataTable() {
    this.http.get('location', res => {
      this.locations = res;
      setTimeout(() => {
        $("#locationTable").DataTable({
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

  }

  createNewLocation() {
    this.location = new Location();
  }

  saveCreatedLocation() {
    this.http.post('location', this.location, res => {
      location.reload();
    })
  }

}
