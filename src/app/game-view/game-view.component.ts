import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { AnimalComponent } from '../animal/animal.component';
import { InputComponent } from '../input/input.component';
import { PlayerComponent } from '../player/player.component';
import { TimeService } from '../time.service';
import { GameLogicService } from '../game-logic.service';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  @ViewChild('playerInput') inputRef: InputComponent;
  @ViewChild('player') playerRef: PlayerComponent;
  ctx: CanvasRenderingContext2D;
  testAnimal: AnimalComponent;
  // -1 is fully left, +1 is fully right
  inputAxisX: number = 0;
  // -1 is fully up, +1 is fully down
  inputAxisY: number = 0;
  testRabbit: AnimalComponent;
  testTurtle: AnimalComponent;

  constructor(private animalsService: AnimalsService, private timeService: TimeService,
    private gameLogicService: GameLogicService, private playersService: PlayersService) {
    this.testRabbit = new AnimalComponent(this.animalsService, 0, this.timeService);
    this.testTurtle = new AnimalComponent(this.animalsService, 1, this.timeService);
    this.testTurtle.setPosition(50, 50);
    this.testAnimal = this.testTurtle;
    this.timeService.addListener(this.tick.bind(this));
  }

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    this.inputRef.addListener("KeyW", this.pressUp.bind(this), this.releaseUp.bind(this));
    this.inputRef.addListener("KeyA", this.pressLeft.bind(this), this.releaseLeft.bind(this));
    this.inputRef.addListener("KeyS", this.pressDown.bind(this), this.releaseDown.bind(this));
    this.inputRef.addListener("KeyD", this.pressRight.bind(this), this.releaseRight.bind(this));
    this.inputRef.addListener("NumpadAdd", this.scaleUp.bind(this));
    this.inputRef.addListener("NumpadSubtract", this.scaleDown.bind(this));
    this.inputRef.addListener("Enter", null, null, this.switchAnimal.bind(this));

    this.timeService.addListener(this.draw.bind(this));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    let animals = this.animalsService.getAnimals();

    for (var i = 0; i < animals.length; i++) {
      animals[i].draw(this.ctx);
    };
  }

  switchAnimal() {
    if (this.testAnimal == this.testTurtle) {
      this.testAnimal = this.testRabbit;
    } else {
      this.testAnimal = this.testTurtle;
    }
  }

  scaleUp() {
    this.testAnimal.scale++;
  }

  scaleDown() {
    if (this.testAnimal.scale > 1) this.testAnimal.scale--;
  }

  pressUp() {
    this.inputAxisY = -1;
  }

  pressLeft() {
    this.inputAxisX = -1;
    this.playersService.socket.emit('inputX', this.inputAxisX, (data) => {console.log("Server heard me go left!!! She said: \"" + data + '"')});
  }

  pressRight() {
    this.inputAxisX = 1;
    this.playersService.socket.emit('inputX', this.inputAxisX, (data) => {console.log("Server heard me go right!!! She said: \"" + data + '"')});
  }

  pressDown() {
    this.inputAxisY = 1;
  }

  releaseUp() {
    this.inputAxisY = 0;
  }

  releaseLeft() {
    this.inputAxisX = 0;
  }

  releaseRight() {
    this.inputAxisX = 0;
  }

  releaseDown() {
    this.inputAxisY = 0;
  }

  tick() {
    let xMove = this.inputAxisX * this.testAnimal.scale;
    let yMove = this.inputAxisY * this.testAnimal.scale;
    let c2 = Math.pow(xMove, 2) + Math.pow(yMove, 2);

    if (c2 !== 0) {
      let angle = Math.asin(yMove / Math.sqrt(c2));
      let xSpeed = this.inputAxisX < 0 ? -Math.cos(angle) : Math.cos(angle);
      let ySpeed = Math.sin(angle);

      this.gameLogicService.moveAnimal(this.testAnimal, xSpeed * (this.testAnimal.speed / this.testAnimal.scale), ySpeed * (this.testAnimal.speed / this.testAnimal.scale));
    }
  }

}
