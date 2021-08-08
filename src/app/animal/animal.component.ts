import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { TimeService } from '../time.service';
import { AnimalsService } from '../animals.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  spriteSheet: HTMLImageElement;
  currentFrame: number = 0;
  numFrames: number = 4;
  scale: number = 4;
  cardinalStrings: string[] = ["right", "down", "left", "up"];
  cardinalDir: number = 0;
  width: number = 16;
  height: number = 16;
  x: number = 0;
  y: number = 0;
  vector = {x: 0, y: 0};
  speed: number = 3;
  msBetweenFrames: number = 100;
  previousMs: number = 0;
  species: string = "Uncertain";

  constructor(private animalsService: AnimalsService, private speciesIndex: number, private timeService: TimeService) {
    this.animalsService = animalsService;

    this.spriteSheet = new Image();
    let sourceObject = animalsService.getAnimalObjectByIndex(speciesIndex);
    this.spriteSheet.src = 'assets/images/' + sourceObject.species + '/move.png';
    this.speed = sourceObject.speed;
    this.msBetweenFrames = sourceObject.msBetweenFrames;
    this.species = sourceObject.species;

    this.animalsService.addAnimal(this);
  }

  ngOnInit() {

  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.spriteSheet, this.width * this.currentFrame, this.height * this.cardinalDir, this.width, this.height, this.x * this.scale, this.y * this.scale, this.width * this.scale, this.height * this.scale);
  }

  tickAnimation() {
    if (this.timeService.getCurrentMilliseconds() - this.previousMs >= this.msBetweenFrames) {
      this.nextFrame();
      this.previousMs = this.timeService.getCurrentMilliseconds();
    }
  }

  nextFrame() {
    if (this.currentFrame++ >= this.numFrames - 1) this.currentFrame = 0;
  }

  rotateClockwise() {
    if (this.cardinalDir++ >= this.cardinalStrings.length - 1) this.cardinalDir = 0;
  }

  setDirection(direction: number) {
    this.cardinalDir = direction;
  }

  addVector(x: number, y: number) {
    this.vector.x += x;
    this.vector.y += y;
  }

  subtractVector(x: number, y: number) {
    this.vector.x -= x;
    this.vector.y -= y;
  }

  // An untyped object with unpredictable properties? Terrible...
  //   They're just x and y, for now
  getVector() {
    return this.vector;
  }

  scaleVector(scaleX: number, scaleY: number) {
    this.vector.x *= scaleX;
    this.vector.y *= scaleY;
    if (Math.abs(this.vector.x) < 0.01) this.vector.x = 0;
    if (Math.abs(this.vector.y) < 0.01) this.vector.y = 0;
  }

  setPosition(x: number, y: number) {
    if (x > this.x) {
      this.cardinalDir = 0;
    } else if (x < this.x) {
      this.cardinalDir = 2;
    }
    if (y > this.y) {
      this.cardinalDir = 1;
    } else if (y < this.y) {
      this.cardinalDir = 3;
    }
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getCurrentFrame(): number {
    return this.currentFrame;
  }
}
