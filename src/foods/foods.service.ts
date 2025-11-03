import { Injectable } from '@nestjs/common';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';

@Injectable()
export class FoodsService {
  create(createFoodInput: CreateFoodInput) {
    return 'This action adds a new food';
  }

  findAll() {
    return `This action returns all foods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  update(id: number, updateFoodInput: UpdateFoodInput) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
