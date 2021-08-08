import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class TimeService implements OnInit {

  gameTick;
  listeners = [];

  constructor() {
    console.log("Time is running.");
    this.gameTick = setInterval(this.tick.bind(this), 50);
  }

  ngOnInit() {

  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  tick() {
    this.listeners.forEach(function(listener) {
      listener();
    });
  }

  getCurrentMilliseconds() {
    return new Date().getTime();
  }

  stopTime() {
    clearInterval(this.gameTick);
    console.log("Time has stopped.");
  }

}
