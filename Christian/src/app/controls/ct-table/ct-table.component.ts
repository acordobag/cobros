import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Btn } from '../../entities';

@Component({
  selector: 'ct-table, [ct-datatable]',
  templateUrl: './ct-table.component.html',
  styleUrls: ['./ct-table.component.css']
})
export class CtTableComponent implements OnInit {

  private dtOptions: any;
  private dtTrigger: Subject<any>;
  private dt: DataTables.Api;
  private dtInstance: Promise<DataTables.Api>;

  @Input()
  id: string;
  @Input()
  data: Array<any>;
  @Input()
  columns: Object;
  @Input()
  currecyColumns: Object;
  @Input()
  dateColumns: Object;
  @Input()
  btn: Btn;
  @Input()
  pageRows: number = 10;
  @Input()
  btnShowColunm: string;
  @Input()
  btnShowValues: string[];

  @Output()
  btnClick = new EventEmitter()

  Object = Object;

  constructor() {
    this.dtTrigger = new Subject();
  }

  ngOnInit() {
    this.dtOptions = {
      responsive: true,
      language: {
        "info": "Mostrando pagina _PAGE_ de _PAGES_",
        "infoEmpty": "No hay registros disponibles",
        "lengthMenu": "Mostrando _MENU_ registros por pagina ",
        "search": "Buscar:",
        "paginate": {
          "first": '<i class="fa fa-fast-backward" aria-hidden="true"></i>',
          "last": '<i class="fa fa-fast-forward" aria-hidden="true"></i>',
          "next": '<i class="fa fa-step-forward" aria-hidden="true"></i>',
          "previous": '<i class="fa fa-step-backward" aria-hidden="true"></i>'
        }
      },
      pagingType: 'full_numbers',
      buttons: [
        'copy', 'excel', 'pdf'
      ],
      pageLength: this.pageRows
    };
    this.currecyColumns = this.currecyColumns ? this.currecyColumns : ['Sin datos'];
    this.dateColumns = this.dateColumns ? this.dateColumns : ['Sin datos'];
    this.columns = this.columns ? this.columns : ['Sin datos'];
    this.dtTrigger.subscribe(() => {
      this.displayTable();
    });
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  btnOnClick(id: number): void {
    this.btnClick.emit(id);
  }

  ngOnDestroy(): void {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.dt) {
      this.dt.destroy(true);
    }
  }

  showBtnFn(row) {
    if(!this.btnShowValues) return true
    for (const v of this.btnShowValues) {
      if (row[this.btnShowColunm] == v)
        return true;
    }
    return false
  }

  private displayTable(): void {
    this.dtInstance = new Promise((resolve) => {
      Promise.resolve(this.dtOptions).then(dtOptions => {
        setTimeout(() => {
          this.dt = $('#' + this.id).DataTable(dtOptions);
          resolve(this.dt);
        });
      });
    });
  }

}
