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
  score = 0;
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
  ) {}

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
            // this.openDialog(
            //   'Xin chào ' + this.userName,
            //   'Bạn có đồng ý bắt đầu chơi',
            //   result => {
            //     if (result) {
            //       this.run();
            //     }
            //   }
            // );
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
    this.playground.checkLogin(this.token, this.studentId).then(res => {
      this.isPlaying = true;
      console.log(res);
      if (res.code === 0) {
        this.noiDung = 'Rất tiếc, bạn đã bị loại.';
      } else {
        this.noiDung =
          'Chào mừng bạn đến với đấu trường IT Phần chơi của bạn sắp bắt đầu';
        this.Subscription = this.socket.waitQuestion().subscribe(quest => {
          console.log(quest);
          this.count++;
          self.isSendAnswer = false;
          this.timeChoi = 20;
        });
        // this.socket.getSOS().subscribe(message => {
        //   clearInterval(this.quetSprint);
        // });
        // this.Subscription = this.socket.waitQuestion().subscribe(quest => {
        //   this.count++;
        //   self.isSendAnswer = false;
        //   this.subscribeCheck = this.socket
        //     .check(this.studentId)
        //     .subscribe(message => {
        //       this.isPlaying = true;
        //       if (message.res.code === 0) {
        //         this.noiDung =
        //           'Bạn đã bị loại, đăng nhập với tư cách khán giả để giúp người chơi khác.';
        //         this.timeChoi = -10;
        //         this.cauHoi = '';
        //         this.arrDapAn = [];
        //         this.Subscription.unsubscribe();
        //       } else {
        //         this.timeChoi = 20;
        //         this.noiDung = '';
        //         this.cauHoi = quest.message.content;
        //         this.arrDapAn = quest.message.options;
        //         this.questionId = quest.message._id;
        //         clearInterval(self.quetSprint);
        //         this.quetSprint = setInterval(function() {
        //           if (self.timeChoi <= 1) {
        //             clearInterval(self.quetSprint);
        //             self.isPlaying = true;
        //           }
        //           self.timeChoi = self.timeChoi - 1;
        //           if (self.timeChoi < 1&&self.isSendAnswer===false) {
        //             let answer = {
        //               userName: self.userName,
        //               studentId: self.studentId,
        //               time: 20 - self.timeChoi,
        //               answer: '',
        //               questionId: self.questionId
        //             };
        //             self.socket.answer(answer);
        //             self.cauHoi = '';
        //             self.arrDapAn = [];
        //             self.noiDung =
        //               'Rất tiếc bạn đã bị loại do không trả lời câu hỏi vừa rồi';
        //             self.Subscription.unsubscribe();
        //           }
        //         }, 1000);
        //       }
        //     });
        // });
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
          this.socket.answer(answer);
          this.isPlaying = false;
          this.isSendAnswer = true;
          this.arrDapAn = [];
          this.noiDung = 'Chờ câu hỏi tiếp theo.';
          // clearInterval(this.quetSprint);
          this.subscribeCheck.unsubscribe();
        }
      }
    );
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
  ) {}
}
