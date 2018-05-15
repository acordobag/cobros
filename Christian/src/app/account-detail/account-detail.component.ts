import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../entities';

declare var $: any;

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  private account: Account;
  private table: any;
  private btnEditar: string;

  constructor(private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit() {
    this.account = new Account();
    this.btnEditar = "Editar";
    this.changeInputsState(true);
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.http.get('account/' + id, res => {
        this.account = res;
        this.createDataTable();
      });
    });

  }

  changeInputsState(v: boolean): void {
    $('#accountForm :input.editable').prop('disabled', v);
  }

  editCustomer() {
    if (this.btnEditar == "Editar") {
      this.btnEditar = "Guardar";
      this.changeInputsState(false);
      //Update Method
    } else {
      this.btnEditar = "Editar";
      this.changeInputsState(true);
    }
  }

  createDataTable() {
    setTimeout(() => {
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
    });
  }

}
