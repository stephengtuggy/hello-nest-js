import { Injectable } from '@nestjs/common';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';
import { Food } from './entities/food.entity';
import { MyLogger } from '../my-logger.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class FoodsService {
  private foodArray: Food[] = [];

  constructor(private myLogger: MyLogger) {
    this.myLogger.setContext('FoodsService');
  }

  async create(createFoodInput: CreateFoodInput): Promise<Food> {
    this.myLogger.debug('Creating food with input', createFoodInput);
    let newFood = new Food();
    newFood.id = randomUUID();
    newFood.name = createFoodInput.name;
    this.foodArray.push(newFood);
    return newFood;
  }

  async findAll(): Promise<Food[]> {
    this.myLogger.debug('Finding all foods');
    return this.foodArray;
  }

  async findOneByID(id: string): Promise<Food> {
    this.myLogger.debug('Finding food with id', id);
    const index = this.foodArray.findIndex((f) => f.id === id);
    if (index > -1) {
      return this.foodArray[index];
    } else {
      return null;
    }
  }

  async update(updateFoodInput: UpdateFoodInput): Promise<Food> {
    const index = this.foodArray.findIndex((f) => f.id === updateFoodInput.id);
    if (index > -1) {
      this.myLogger.debug(`Updating food ${updateFoodInput.id} with input`, updateFoodInput);
      this.foodArray[index].id = updateFoodInput.id;
      this.foodArray[index].name = updateFoodInput.name;
      return this.foodArray[index];
    } else {
      return null;
    }
  }

  async remove(id: string): Promise<boolean> {
    const index = this.foodArray.findIndex((f) => f.id === id);
    if (index > -1) {
      this.myLogger.debug('Removing food with id', id);
      this.foodArray.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
