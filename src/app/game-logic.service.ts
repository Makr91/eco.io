import { Injectable } from '@angular/core';
import { AnimalComponent } from './animal/animal.component';

import { AnimalsService } from './animals.service';
import { TimeService } from './time.service';

@Injectable()
export class GameLogicService {

  constructor(private timeService: TimeService, private animalsService: AnimalsService) {
    this.timeService.addListener(this.tick.bind(this));
  }

  moveAnimal(animal: AnimalComponent, xAmount: number, yAmount: number) {
    animal.addVector(xAmount, yAmount);
    //animal.setPosition(animal.getX() + xAmount, animal.getY() + yAmount);
  }

  tick() {
    // ASSUMING RABBIT FOR NOW
    for (var animal of this.animalsService.getAnimals()) {
      let vect = animal.getVector();
      animal.setPosition(animal.scale * vect.x + animal.getX(), animal.scale * vect.y + animal.getY());

      let directionTolerance: number = 0;
      if ( (Math.abs(vect.x) > directionTolerance || Math.abs(vect.y) > directionTolerance)) {
        if (Math.abs(vect.x) > Math.abs(vect.y)) {
          if (vect.x > 0) {
            animal.setDirection(0);
          } else if (vect.x < 0) {
            animal.setDirection(2);
          }
        } else {
          if (vect.y > 0) {
            animal.setDirection(1);
          } else if (vect.y < 0) {
            animal.setDirection(3);
          }
        }
      }

      let animationTolerance: number = 0.01;
      // `animal.getCurrentFrame() === 2` check is only for the rabbit's hopping animation,
      //   hard coding it for now
      if (Math.abs(vect.x) > animationTolerance || Math.abs(vect.y) > animationTolerance || animal.getCurrentFrame() !== 0) {
        animal.tickAnimation();
      }

      animal.scaleVector(.02, .02);
    }
  }

}
