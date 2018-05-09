import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentroundsService } from './currentrounds.service';
import { PlaygroundsService } from './playgrounds.service';
import { QuestionlistsService } from './questionlists.service';
import { QuestionsService } from './questions.service';
import { RoundsService } from './rounds.service';
import { StudentidsService } from './studentids.service';
import { PlayersService } from './players.service';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    PlayersService,
    AuthService,
    UsersService,
    StudentidsService,
    RoundsService,
    QuestionsService,
    QuestionlistsService,
    PlaygroundsService,
    CurrentroundsService
  ]
})
export class ApiModule {}
