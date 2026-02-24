import { isProd } from '@/libs/utils/is-dev.util';
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'

import { AppModule } from './app.module'
import { buildSessionOptions } from '@/libs/config/session.config'
import { createRedisClient } from '@/libs/config/redis.config'
import { createCsrfMiddleware } from '@/libs/config/csrf.config'
import { createOriginGuard } from '@/libs/config/origin.config'


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  
  //TODO: merge with your main.ts
  if (isProd(config)) app.set('trust proxy', 1);
  
  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const redis = await createRedisClient(config);

  app.use(session(buildSessionOptions(config, redis)));
  app.use(createCsrfMiddleware(config));

  const originGuard = createOriginGuard(config);
  if (originGuard) {
    app.use(originGuard);
  }

  app.enableCors({
    origin: config.getOrThrow<string>('APPLICATION_URL'),
    credentials: true,
  });

  const port = config.get<number>('PORT') ?? config.get<number>('APPLICATION_PORT') ?? 3001;
  await app.listen(port);
}

bootstrap();
