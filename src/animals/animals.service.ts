import { Injectable } from '@nestjs/common';
import { NewAnimalInput } from './dto/new-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { Animal } from './models/animal.model';
import { MyLogger } from '../my-logger.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AnimalsService {
  private animalArray: Animal[] = [];

  constructor(private myLogger: MyLogger) {
    this.myLogger.setContext('AnimalsService');
  }

  async create(data: NewAnimalInput): Promise<Animal> {
    this.myLogger.debug('Creating animal with input', data);
    let newAnimal = new Animal();
    newAnimal.id = randomUUID();
    newAnimal.name = data.name;
    this.animalArray.push(newAnimal);
    return newAnimal;
  }

  async findOneByID(id: string): Promise<Animal> {
    this.myLogger.debug('Finding animal with ID', id);
    const index = this.animalArray.findIndex((a) => a.id === id);
    if (index > -1) {
      return this.animalArray[index];
    } else {
      return null;
    }
  }

  async findAll(): Promise<Animal[]> {
    this.myLogger.debug('Finding all animals');
    return this.animalArray;
  }

  async update(data: UpdateAnimalInput): Promise<Animal> {
    const index = this.animalArray.findIndex((a) => a.id === data.id);
    if (index > -1) {
      this.myLogger.debug(`Updating animal ${data.id} with input`, data);
      this.animalArray[index].id = data.id;
      this.animalArray[index].name = data.name;
      return this.animalArray[index];
    } else {
      return null;
    }
  }

  async remove(id: string): Promise<boolean> {
    const index = this.animalArray.findIndex((a) => a.id === id);
    if (index > -1) {
      this.myLogger.debug('Removing animal with ID', id);
      this.animalArray.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
