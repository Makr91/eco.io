import { Injectable } from '@angular/core';

import { AnimalComponent } from './animal/animal.component';
import { animals } from './animals.list';

@Injectable()
export class AnimalsService {
  animals: AnimalComponent[] = [];

  constructor() {

  }

  addAnimal(animal) {
    this.animals.push(animal);
    console.log("Registered a new animal, total animals = " + this.animals.length);
  }

  getAnimals() {
    return this.animals;
  }

  getAnimalObjectByIndex(index: number) {
    return animals.list[index];
  }

}
