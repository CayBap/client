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

  ngOnInit() {
    this.socket.waitQuestion().subscribe(message => {
      this.viewerAnswer = [0, 0, 0, 0];
      this.viewerAnswerasPercent = [0, 0, 0, 0];
    });
    this.socket.waitViewerSubmit().subscribe(message => {
      let sum = 0;

      switch (message.message) {
        case 1: {
          this.viewerAnswer[0]++;

          break;
        }
        case 2: {
          this.viewerAnswer[1]++;

          break;
        }
        case 3: {
          this.viewerAnswer[2]++;

          break;
        }
        case 4: {
          this.viewerAnswer[3]++;

          break;
        }
      }
      for (let i = 0; i < this.viewerAnswer.length; i++) {
        sum = sum + this.viewerAnswer[i];
      }
      this.viewerAnswerasPercent[0] = this.viewerAnswer[0] / sum * 100;
      this.viewerAnswerasPercent[1] = this.viewerAnswer[1] / sum * 100;
      this.viewerAnswerasPercent[2] = this.viewerAnswer[2] / sum * 100;
      this.viewerAnswerasPercent[3] = this.viewerAnswer[3] / sum * 100;
    });
  }
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
