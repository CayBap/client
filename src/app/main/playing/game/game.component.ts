import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('wrapper') wrapper: ElementRef;
  @Output() catched = new EventEmitter();

  clientHeight;
  clientWidth;
  @Input() score;
  time = 0;
  randomSize;
  randomTop;
  randomRight;
  started = false;
  constructor() {}

  ngOnInit() {
    this.startGame();
  }
  startGame() {
    this.score = 0;
    this.started = true;

    this.randomSize = this.random(40) + 20;
    this.randomTop = this.random(100 - this.randomSize);
    this.randomRight = this.random(100 - this.randomSize);
  }
  getRandom() {
    this.score++;
    console.log(this.score);
    this.catched.emit('catched');
    this.clientHeight = this.wrapper.nativeElement.clientHeight;
    this.clientWidth = this.wrapper.nativeElement.clientWidth;
    this.randomSize = this.random(40) + 10;
    this.randomTop = this.random(this.clientHeight - this.randomSize);
    this.randomRight = this.random(this.clientWidth - this.randomSize);
  }
  random(size) {
    return Math.floor(Math.random() * size);
  }
}
