import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Animal } from './models/animal.model';
import { AnimalsService } from './animals.service';
import { NewAnimalInput } from './dto/new-animal.input';

const pubSub = new PubSub();

@Resolver((of) => Animal)
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

  @Query((returns) => Animal)
  async animal(@Args('id') id: string): Promise<Animal> {
    const animal = await this.animalsService.findOneById(id);
    if (!animal) {
      throw new NotFoundException(id);
    }
    return animal;
  }

  @Query((returns) => [Animal])
  async animals(): Promise<Animal[]> {
    return await this.animalsService.findAll();
  }

  @Mutation((returns) => Animal)
  async addAnimal(
    @Args('newAnimalData') newAnimalData: NewAnimalInput,
  ): Promise<Animal> {
    const animal = await this.animalsService.create(newAnimalData);
    pubSub.publish('animalAdded', { animalAdded: animal });
    return animal;
  }

  @Mutation((returns) => Boolean)
  async removeAnimal(@Args('id') id: string): Promise<boolean> {
    return await this.animalsService.remove(id);
  }

  @Subscription((returns) => Animal)
  animalAdded() {
    return pubSub.asyncIterator('animalAdded');
  }
}
