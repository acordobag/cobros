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

  constructor(private http: HttpService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
  }

  login() {
    this.http.post('auth', this.user, res => {
      if (res.token) {
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigate(["/home/customers"]);
      }
    });
  }

}
