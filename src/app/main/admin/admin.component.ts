import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket';
import {
  PlaygroundsService,
  QuestionlistsService,
  QuestionsService
} from '../../api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  _id = '5ac0bb46e2712117d8097831';
  disableStart = false;
  token;
  cauHoiHienTai = '';
  cauHoiTiepTheo = '';
  indexQuestion = 1;
  listQuestion = [];
  constructor(
    private playground: PlaygroundsService,
    private socket: SocketService,
    private questionList: QuestionlistsService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.questionList.getList(this.token, this._id).then(res => {
      this.listQuestion = res.questionslist.questions;
      console.log(res);
    });
  }
  showAnswer() {
    this.socket.showAnswer();
  }
  nextQuestion() {
    this.socket.nextQuestion(this.listQuestion[this.indexQuestion].questId._id);
    this.indexQuestion++;
    this.cauHoiTiepTheo = this.listQuestion[this.indexQuestion].questId.content;
    this.cauHoiHienTai = this.listQuestion[
      this.indexQuestion - 1
    ].questId.content;
  }

  start() {
    this.disableStart = true;
    this.cauHoiHienTai = this.listQuestion[
      this.indexQuestion - 1
    ].questId.content;
    this.socket.start(this.listQuestion[0].questId._id);
    this.cauHoiTiepTheo = this.listQuestion[this.indexQuestion].questId.content;
  }
  getHelper() {
    this.socket.getViewerHelper();
  }
  cuuTro() {
    this.indexQuestion = 0;
    this.socket.cuuTro();
    this._id = '5ae75589e27121176cc1a549';
    this.questionList.getList(this.token, this._id).then(res => {
      console.log(res);
      this.listQuestion = res.questionslist.questions;
      this.cauHoiTiepTheo = this.listQuestion[
        this.indexQuestion
      ].questId.content;
    });
  }
}
