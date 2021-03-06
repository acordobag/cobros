import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

declare var $: any;

@Injectable()
export class HttpService {
  private apiServer = environment.serverUrl;
  constructor(private http: Http) { }

  post(path: string, param: object, callback?): void {
    this.showSpinner();
    this.http.post(this.apiServer + path, param)
      .map(res => res.json())
      .catch((e: any) => Observable.throw(this.handleError(e.json())))
      .subscribe((res) => { this.hideSpinner(); callback(res); })
  }

  // get(path: string, callback?): any {
  //   this.deepGet(path);
  // }

  get(path: string, callback?, url: boolean = false): void {
    this.showSpinner();
    this.http.get(url ? path : (this.apiServer + path))
      .map(res => res.json())
      .catch((e: any) => Observable.throw(this.handleError(e.json())))
      .subscribe((res) => { this.hideSpinner(); callback(res); })
  }

  private showSpinner() {
    $('#spinner').show();
  }

  private hideSpinner() {
    $('#spinner').hide();
  }

  private handleError(error: any) {
    this.hideSpinner();
    console.error(error.error);
  }

}
