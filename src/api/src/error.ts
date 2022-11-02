import * as Sentry from '@sentry/node';
import { Next } from 'koa'

export const error = () => async (ctx: any, next: Next): Promise<void> => {
  try {
    await next()
  } catch (err: any) {
    console.error(err)
    Sentry.captureException(err);
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      error: err.message,
    }
    // ctx.app.emit('error', err, ctx);
  }
}
