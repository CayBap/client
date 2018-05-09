import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService, AuthService } from '../api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInUsername: string = '';
  logInPassword: string = '';

  signUpName: string = '';
  signUpStudentId: string = '';
  signUpPhone: string = '';
  signUpPassword: string = '';
  signUpRePassword: string = '';

  constructor(
    private user: UsersService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      this.user
        .checkLogin(token)
        .then(res => {
          if (res.code == 1) {
            this.router.navigate(['main', 'playing']);
          } else {
            localStorage.removeItem('token');
            this.router.navigate(['login']);
          }
        })
        .catch(err => {
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        });
    } else {
      this.router.navigate(['login']);
    }
  }
  logIn() {
    if (this.logInUsername.length < 10 || this.logInUsername.length > 12) {
      alert('Mã sinh viên không đúng');
      return;
    }
    if (this.logInPassword.length < 6) {
      alert('Mật khẩu quá ngắn');
      return;
    }
    this.auth.logIn(this.logInUsername, this.logInPassword).then(res => {
      console.log(res);
      if (res.code == 3) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.name);
        localStorage.setItem('studentId', res.user.studentId);
        if (res.user.role === 'admin') {
          this.router.navigate(['main', 'admin']);
        } else if (res.user.role === 'view') {
          this.router.navigate(['scoreboard']);
        } else {
          this.router.navigate(['main', 'playing']);
        }
      } else {
        alert('Đăng nhập không thành công');
      }
    });
  }

  
}
