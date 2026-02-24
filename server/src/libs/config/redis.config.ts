import { ConfigService } from '@nestjs/config'
import { createClient } from 'redis'

export async function createRedisClient(config: ConfigService) {
  const client = createClient({
    url: config.getOrThrow<string>('REDIS_URL'),
  });

  client.on('error', (error) => {
    console.error('Redis client error', error);
  });

  await client.connect();

  return client;
}
