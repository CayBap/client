import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import {
  PlayingComponent,
  DialogOverviewExampleDialog
} from './playing/playing.component';
import { AdminComponent } from './admin/admin.component';
import { GameComponent } from './playing/game/game.component';

@NgModule({
  imports: [
    MainRoutingModule,
    CoreModule

    // Specify ng-circle-progress as an import
  ],
  exports: [],
  declarations: [
    MainComponent,
    PlayingComponent,
    DialogOverviewExampleDialog,
    AdminComponent,
    GameComponent
  ],
  providers: [],
  entryComponents: [DialogOverviewExampleDialog]
})
export class MainModule {}
