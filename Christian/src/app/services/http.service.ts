import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Injectable()
export class HttpService {
  private apiServer = "http://10.0.0.12:8000/api/";
  constructor(private http: Http) { }

  post(path: string, param: object, callback?): any {
    this.showSpinner();
    this.http.post(this.apiServer + path, param)
      .map(res => res.json())
      .subscribe(res => {
        this.hideSpinner();
        callback(res);
      });
  }

  get(path: string, callback?): any {
    this.http.get(this.apiServer + path)
      .map(res => res.json())
      .subscribe(res => {
        this.hideSpinner();
        callback(res);
      })
  }

  private showSpinner() {
    $('#spinner').show();
  }

  private hideSpinner() {
    $('#spinner').hide();
  }
}
