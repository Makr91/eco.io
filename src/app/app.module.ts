// npm install the following:
//   rxjs
//   socket.io

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameViewComponent } from './game-view/game-view.component';
import { AnimalComponent } from './animal/animal.component';
import { InputComponent } from './input/input.component';
import { PlayerComponent } from './player/player.component';

import { AnimalsService } from './animals.service';
import { TimeService } from './time.service';
import { GameLogicService } from './game-logic.service';
import { PlayersService } from './players.service';


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    GameViewComponent,
    AnimalComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimeService, AnimalsService, GameLogicService, PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
