import { ConfigService } from '@nestjs/config'
import * as session from 'express-session'
import { RedisStore } from 'connect-redis'
import { createClient } from 'redis'

import { ms, StringValue } from '@/libs/utils/ms.util'
import { parseBoolean } from '@/libs/utils/parse-boolean.util'

export function buildSessionOptions(
  config: ConfigService,
  redisClient: ReturnType<typeof createClient>,
): session.SessionOptions {
  const cookieOptions: session.CookieOptions = {
    domain: config.get<string>('SESSION_DOMAIN') || undefined,
    maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
    httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
    secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
    sameSite: (config.get<string>('SESSION_SAME_SITE') || 'lax') as
      | 'lax'
      | 'strict'
      | 'none',
  }

  return {
    store: new RedisStore({
      client: redisClient,
      prefix: config.getOrThrow<string>('REDIS_SESSION_PREFIX'),
    }),
    secret: config.getOrThrow<string>('SESSION_SECRET'),
    name: config.getOrThrow<string>('SESSION_NAME'),
    proxy: config.get<string>('NODE_ENV') === 'production',
    resave: false,
    saveUninitialized: false,
    cookie: cookieOptions,
  }
}
