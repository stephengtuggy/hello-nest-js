import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { validate } from './config/env.validation';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FoodsModule } from './foods/foods.module';
import { CatchEverythingFilter } from './catch-everything/catch-everything.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      cache: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      graphiql: true,
      subscriptions: {
        'graphql-ws': true,
      },
      autoSchemaFile: 'schema.gql',
    }),
    AnimalsModule,
    FoodsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
