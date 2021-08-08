import { Component, OnInit } from '@angular/core';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {

  listeners = [];
  keyTracker: Object = {};

  constructor(private timeService: TimeService) {
    window.addEventListener("click", this.handleClick.bind(this));
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    timeService.addListener(this.tick.bind(this));
  }

  ngOnInit() {
  }

  handleClick(event) {
    console.log(event);
  }

  handleKeyDown(event) {
    if (this.keyTracker[event.code] === undefined) console.log("First time pressing " + event.code + ".");
    if (this.keyTracker[event.code] !== true) {
      for (var listener of this.listeners) {
        if (listener.keyCode === event.code && listener.pressCallback !== null) listener.pressCallback();
      }
    }
    this.keyTracker[event.code] = true;
  }

  handleKeyUp(event) {
    this.keyTracker[event.code] = false;
    for (var listener of this.listeners) {
      if (listener.upCallback !== null) listener.upCallback();
    }
  }

  tick() {
    // If a registered key is being held down, call its function
    for (var key in this.keyTracker) {
      for (var listener of this.listeners) {
        if (listener.keyCode === key) {
          if (this.keyTracker[key] === true) {
            if (listener.downCallback !== null) listener.downCallback();
          }
        }
      }
    }
  }

  addListener(keyCode, downCallback, upCallback = null, pressCallback = null) {
    this.listeners.push({keyCode: keyCode, downCallback: downCallback, upCallback: upCallback, pressCallback: pressCallback});
  }

}
