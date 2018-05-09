import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlaygroundsService } from '../api';
import { SocketService } from '../socket';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  user: '';
  pass: '';
  scoreboard = true;
  listScore = [];
  listShow = [];
  viewerAnswer = [0, 0, 0, 0];
  viewerAnswerasPercent = [0, 0, 0, 0];
  indexScore = 10;
  loop;
  constructor(
    private ground: PlaygroundsService,
    private router: Router,
    private socket: SocketService
  ) {}

  ngOnInit() {}

  showResetPass() {
    this.scoreboard = false;
    clearInterval(this.loop);
  }
  showScore() {
    let self = this;
    this.loop = setInterval(function() {
      self.ground.scoreboard().then(res => {
        if (res.code == 3) {
          self.listScore = res.score;
        }
      });
    }, 1000);

    this.scoreboard = true;
  }
  resetPass() {
    console.log(this.user);
    console.log(this.pass);
  }
}
