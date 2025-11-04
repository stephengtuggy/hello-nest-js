import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Environment, EnvironmentVariables } from './config/env.validation';
import { MyLogger } from './my-logger.service';

export async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger))
  const myLogger = app.get(MyLogger);

  const configService =
    app.get<ConfigService<EnvironmentVariables, true>>(ConfigService);
  const appHost: string = configService.get('APP_HOST', 'localhost', {
    infer: true,
  });
  const appPort: number = configService.get('APP_PORT', 3000, { infer: true });
  const environment: Environment = configService.get(
    'NODE_ENV',
    Environment.Development,
    { infer: true },
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(appPort, appHost);

  myLogger.log(
    `Application is running in: ${environment} configuration on: ${await app.getUrl()}`,
  );
}

void bootstrap();
