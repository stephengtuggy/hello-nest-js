import { NotFoundException } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Animal } from './models/animal.model';
import { AnimalsService } from './animals.service';
import { NewAnimalInput } from './dto/new-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';

const pubSub = new PubSub();

@Resolver(() => Animal)
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

  @Query(() => Animal)
  async animal(@Args('id', { type: () => ID }) id: string): Promise<Animal> {
    const animal = await this.animalsService.findOneByID(id);
    if (!animal) {
      throw new NotFoundException(id);
    }
    return animal;
  }

  @Query(() => [Animal])
  async animals(): Promise<Animal[]> {
    return await this.animalsService.findAll();
  }

  @Mutation(() => Animal)
  async addAnimal(
    @Args('newAnimalData') newAnimalData: NewAnimalInput,
  ): Promise<Animal> {
    const animal = await this.animalsService.create(newAnimalData);
    await pubSub.publish('animalAdded', { animalAdded: animal });
    return animal;
  }

  @Mutation(() => Animal)
  async updateAnimal(@Args('updateAnimalInput') updateAnimalInput: UpdateAnimalInput): Promise<Animal> {
    const animal = await this.animalsService.update(updateAnimalInput);
    await pubSub.publish('animalUpdated', animal);
    return animal;
  }

  @Mutation(() => Boolean)
  async removeAnimal(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    const success = await this.animalsService.remove(id);
    if (success) {
      await pubSub.publish('animalRemoved', { animalRemoved: id });
    }
    return success;
  }

  @Subscription(() => Animal)
  animalAdded() {
    return pubSub.asyncIterableIterator('animalAdded');
  }

  @Subscription(() => Animal)
  animalUpdated() {
    return pubSub.asyncIterableIterator('animalUpdated');
  }

  @Subscription(() => Animal)
  animalRemoved() {
    return pubSub.asyncIterableIterator('animalRemoved');
  }
}
