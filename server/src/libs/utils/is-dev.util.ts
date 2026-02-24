import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export const isDev = (configService: ConfigService) =>
  configService.getOrThrow('NODE_ENV') === 'development';
export const isProd = (configService: ConfigService) => {
  return configService.getOrThrow('NODE_ENV') === 'production';
};
export const IS_DEV_ENV = process.env.NODE_ENV === 'development';

export const IS_PROD_ENV = !IS_DEV_ENV;