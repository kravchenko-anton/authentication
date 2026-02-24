import { ConfigService } from '@nestjs/config'
import { RequestHandler } from 'express'
import { randomBytes } from 'crypto'

import { parseBoolean } from '@/libs/utils/parse-boolean.util'

export function getCsrfCookieName(config: ConfigService) {
  return config.get<string>('CSRF_COOKIE_NAME') ?? 'csrf_token'
}

export function getCsrfCookieOptions(config: ConfigService) {
  return {
    domain: config.get<string>('SESSION_DOMAIN') || undefined,
    path: '/',
    httpOnly: false,
    secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
    sameSite: (config.get<string>('SESSION_SAME_SITE') || 'lax') as
      | 'lax'
      | 'strict'
      | 'none',
  }
}

export function createCsrfMiddleware(
  config: ConfigService,
): RequestHandler {
  const cookieName = getCsrfCookieName(config)

  return (req, res, next) => {
    if (!req.session) {
      return next()
    }

    const hasUser = typeof req.session.userId !== 'undefined'
    if (!hasUser) {
      return next()
    }

    if (!req.session.csrfToken) {
      req.session.csrfToken = randomBytes(32).toString('hex')
    }

    res.cookie(cookieName, req.session.csrfToken, getCsrfCookieOptions(config))

    const method = req.method.toUpperCase()
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      return next()
    }

    const headerToken = (req.headers['x-csrf-token'] as
      | string
      | undefined) ?? (req.body?._csrf as string | undefined)

    if (!headerToken || headerToken !== req.session.csrfToken) {
      return res.status(403).json({ message: 'Invalid CSRF token.' })
    }

    return next()
  }
}
