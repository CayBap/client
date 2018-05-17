import {
  Component,
  Inject,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import {
  UsersService,
  AuthService,
  RoundsService,
  PlaygroundsService,
  PlayersService
} from '../../api';
import { SocketService } from '../../socket';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit, OnDestroy {
  isHelper= false;
  chickenCatched = 0;
  playerAnswer: '';
  message: any;
  subscribeCheck: Subscription;
  Subscription: Subscription;
  answered = false;
  socket: SocketService;
  questionId;
  arrDapAn = [];
  cauHoi = '';
  noiDung = '';
  token = '';
  userName = '';
  studentId = '';
  timeChoi = -10;
  quetSprint;
  dialogRef;
  time = 0;
  count = 0;
  isPlaying = undefined;
  isSendAnswer = false;
  constructor(
    private user: UsersService,
    private auth: AuthService,
    private playground: PlaygroundsService,
    private round: RoundsService,
    private router: Router,
    public dialog: MatDialog,
    private players: PlayersService
  ) { }

  ngOnInit() {
    // this.token = localStorage.getItem('token');
    this.token = localStorage.getItem('token');
    this.userName = localStorage.getItem('userName');
    this.studentId = localStorage.getItem('studentId');
    if (this.token) {
      this.user
        .checkLogin(this.token)
        .then(res => {
          if (res.code != 1) {
            localStorage.removeItem('token');
            this.router.navigate(['login']);
          } else {
            this.run();
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

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  closeAll() {
    this.dialogRef.close();
  }
  getHelper() {
    clearInterval(this.quetSprint);
  }
  run(): void {
    const self = this;
    this.socket = new SocketService();
    this.socket.onLogin().subscribe(message => {
      this.socket.login({
        command: 1000,
        token: this.token
      });
    });

    // Phần cứu trợ

    this.socket.onRevial().subscribe(data => {
      if (data.command === 112) {
        this.Subscription.unsubscribe();
        this.count = 0;
        this.noiDung =
          'Chúc mừng bạn đã được cứu trợ. Hãy sẵn sàng cho câu hỏi tiếp theo.';
        this.count = 0;
        this.Subscription = this.socket.waitQuestion().subscribe(data => {
          if (data.command === 911) {
            this.isHelper = true;
            clearInterval(this.quetSprint);
          }
          if (data.command === 1000) {
            this.playerAnswer = '';
            this.count++;
            this.isSendAnswer = false;
            this.timeChoi = 20;
            this.cauHoi = data.message.content;
            this.arrDapAn = data.message.options;
            this.questionId = data.message._id;
            this.noiDung = '';
            clearInterval(this.quetSprint);
            this.quetSprint = setInterval(function () {
              self.timeChoi = self.timeChoi - 1;

              if (self.timeChoi < 1 && self.isSendAnswer === false) {
                clearInterval(self.quetSprint);
                const answer = {
                  userName: self.userName,
                  studentId: self.studentId,
                  time: 20 - self.timeChoi,
                  answer: '',
                  questionId: self.questionId
                };

                self.socket.answer(answer);
                self.cauHoi = '';
                self.arrDapAn = [];
                self.noiDung =
                  'Rất tiếc bạn đã bị loại do không trả lời câu hỏi vừa rồi';
                self.Subscription.unsubscribe();
              }
              if (self.timeChoi < 1 && self.isSendAnswer === true) {
                self.playground.postChickenScore(
                  self.token,
                  self.studentId,
                  self.chickenCatched
                );
                self.chickenCatched= 0;
                console.log('het gio');
                clearInterval(self.quetSprint);
                self.isPlaying = true;
                self.cauHoi = '';
                self.arrDapAn = [];
                self.noiDung =
                  'Câu trả lời của bạn là: ' +
                  self.playerAnswer +
                  '. Hãy chờ MC công bố đáp án.';
              }
            }, 1000);
          }
          if (data.command === 9999) {
            this.playground.check(this.token, this.studentId).then(res => {
              if (res.code === 0) {
                this.noiDung = 'Rất tiếc bạn đã bị loại.';
                self.Subscription.unsubscribe();
              } else {
                this.noiDung =
                  'Chúc mừng bạn đã trả lời chính xác. Hãy chờ câu hỏi tiếp theo';
              }
            });
          }
        });
      }
    });
    // Phần trước khi cứu trợ

    this.playground.checkLogin(this.token, this.studentId).then(res => {
      this.isPlaying = true;
      console.log(res);
      if (res.code === 0) {
        this.noiDung = 'Rất tiếc, bạn đã bị loại.';
      } else {
        this.noiDung =
          'Chào mừng bạn đến với đấu trường IT Phần chơi của bạn sắp bắt đầu';
        this.Subscription = this.socket.waitQuestion().subscribe(data => {
          if (data.command === 911) {
            this.isHelper = true;
            clearInterval(this.quetSprint);
          }
          if (data.command === 1000) {
            this.playerAnswer = '';
            this.count++;
            this.isSendAnswer = false;
            this.timeChoi = 20;
            this.cauHoi = data.message.content;
            this.arrDapAn = data.message.options;
            this.questionId = data.message._id;
            this.noiDung = '';
            clearInterval(this.quetSprint);
            this.quetSprint = setInterval(function () {
              self.timeChoi = self.timeChoi - 1;

              if (self.timeChoi < 1 && self.isSendAnswer === false) {
                clearInterval(self.quetSprint);
                const answer = {
                  userName: self.userName,
                  studentId: self.studentId,
                  time: 20 - self.timeChoi,
                  answer: '',
                  questionId: self.questionId
                };

                self.socket.answer(answer);
                self.cauHoi = '';
                self.arrDapAn = [];
                self.noiDung =
                  'Rất tiếc bạn đã bị loại do không trả lời câu hỏi vừa rồi';
                self.Subscription.unsubscribe();
              }
              if (self.timeChoi < 1 && self.isSendAnswer === true) {
                self.playground.postChickenScore(
                  self.token,
                  self.studentId,
                  self.chickenCatched
                );
                self.chickenCatched = 0;
                console.log(self.chickenCatched);
                console.log('het gio');
                clearInterval(self.quetSprint);
                self.isPlaying = true;
                self.cauHoi = '';
                self.arrDapAn = [];
                self.noiDung =
                  'Câu trả lời của bạn là: ' +
                  self.playerAnswer +
                  '. Hãy chờ MC công bố đáp án.';
              }
            }, 1000);
          }
          if (data.command === 9999) {
            this.isPlaying = true;
            this.playground.check(this.token, this.studentId).then(res => {
              if (res.code === 0) {
                this.noiDung = 'Rất tiếc bạn đã bị loại.';
                self.Subscription.unsubscribe();
              } else {
                this.noiDung =
                  'Chúc mừng bạn đã trả lời chính xác. Hãy chờ câu hỏi tiếp theo';
              }
            });
          }
        });
      }
    });
  }

  onAnswer(event) {
    this.openDialog(
      event.target.innerText,
      'Bạn có chắc chắn với câu trả lời của mình.',
      result => {
        if (result) {
          let answer = {
            userName: this.userName,
            studentId: this.studentId,
            time: 20 - this.timeChoi,
            answer: event.target.innerText,
            questionId: this.questionId
          };
          if(this.isHelper === true){
            this.isPlaying = true;
            this.noiDung = "Câu trả lời của bạn là " + event.target.innerText + ". Hãy chờ MC công bố đáp án.";
            this.isHelper = false;
          }
          else{
            this.isPlaying =false
          }
          this.socket.answer(answer);
        
          this.isSendAnswer = true;
          this.arrDapAn = [];
          this.playerAnswer = event.target.innerText;
        }
      }
    );
  }
  catched($event) {
    this.chickenCatched++;
  }
  openDialog(title: string, content: string, callback: Function) {
    this.dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: title, content: content }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      return callback(result);
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <h1 mat-dialog-title>Câu trả lời của bạn là: {{data.name}}</h1>
  <div mat-dialog-content>
    <p>{{data.content}}</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true" tabindex="2">YES</button>
    <button mat-button [mat-dialog-close]="false" tabindex="-1">NO</button>
  </div>`
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
