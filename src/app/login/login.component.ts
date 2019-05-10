import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    login: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.user).subscribe(response => {
      this.router.navigate(['/home']);
    });
  }

}
