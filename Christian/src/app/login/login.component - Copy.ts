import { Component, OnInit } from '@angular/core';
import { User } from '../entities';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User;
  private fail: boolean;
  private message: string;

  constructor(private http: HttpService, private router: Router) {
  }

  ngOnInit() {
    this.user = new User();
    this.fail=false;
    this.message="";
  }

  login() {
    this.http.post('auth', this.user, res => {
      if (res.token) {
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigate(["/home/customer"]);
      }else if(res.status==400){
        this.fail=true;
        this.message=res.msg;
      }
    });
  }

}
