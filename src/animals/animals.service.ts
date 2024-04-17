import { Injectable } from '@nestjs/common';
import { NewAnimalInput } from './dto/new-animal.input';
import { Animal } from './models/animal.model';

@Injectable()
export class AnimalsService {
  private animalArray: Animal[] = [];
  private idCounter: number = 1;

  async create(data: NewAnimalInput): Promise<Animal> {
    let newAnimal = new Animal();
    newAnimal.id = `${this.idCounter++}`;
    newAnimal.name = data.name;
    this.animalArray.push(newAnimal);
    return newAnimal;
  }

  async findOneById(id: string): Promise<Animal> {
    const index = this.animalArray.findIndex((a) => a.id === id);
    if (index > -1) {
      return this.animalArray[index];
    } else {
      return null;
    }
  }

  async findAll(): Promise<Animal[]> {
    return this.animalArray;
  }

  async remove(id: string): Promise<boolean> {
    const index = this.animalArray.findIndex((a) => a.id === id);
    if (index > -1) {
      this.animalArray.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
