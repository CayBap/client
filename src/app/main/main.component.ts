import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService, AuthService } from '../api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  title = localStorage.getItem('userName') || 'Bạn chưa đăng nhập';

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
          if (res.code != 1) {
            localStorage.removeItem('token');
            this.router.navigate(['login']);
          } else {
            // this.router.navigate(['main', 'playing']);
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

  onLogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  onScoreboard() {
    this.router.navigate(['scoreboard']);
  }
}
