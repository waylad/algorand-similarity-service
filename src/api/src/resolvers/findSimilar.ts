import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Next } from 'koa'

export const findSimilar = async (ctx: any, next: Next): Promise<void> => {
 console.log(ctx.request.body)

  const response: any = { hello: 'world' }

  ctx.status = 200
  ctx.body = response

  await next()
}
