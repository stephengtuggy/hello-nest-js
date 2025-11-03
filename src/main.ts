import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { Environment, EnvironmentVariables } from './config/env.validation';

export async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const configService = app.get<ConfigService<EnvironmentVariables, true>>(ConfigService);
  const appHost: string = configService.get('APP_HOST', 'localhost', { infer: true });
  const appPort: number = configService.get('APP_PORT', 3000, { infer: true });
  const environment: Environment = configService.get('NODE_ENV', Environment.Development, { infer: true });

  await app.listen(appPort, appHost);

  console.log(`Application is running in: ${environment} configuration on: ${await app.getUrl()}`);
}

void bootstrap();
