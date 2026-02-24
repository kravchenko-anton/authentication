import { ConfigService } from '@nestjs/config'
import { RequestHandler } from 'express'

export function createOriginGuard(
  config: ConfigService,
): RequestHandler | null {
  const allowedOrigin = config.get<string>('APPLICATION_URL')
  const isProd = config.get<string>('NODE_ENV') === 'production'

  if (!isProd || !allowedOrigin) {
    return null
  }

  return (req, res, next) => {
    const method = req.method.toUpperCase()
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
      return next()
    }

    const origin = req.headers.origin
    if (!origin || origin !== allowedOrigin) {
      return res.status(403).json({ message: 'Invalid origin.' })
    }

    return next()
  }
}
