import * as cors from '@koa/cors'
import * as dayjs from 'dayjs'
import * as dotenv from 'dotenv'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

const IO = require('koa-socket-2')
import 'reflect-metadata'

import { Context } from 'koa'
import { logger } from './logger'
import { error } from './error'
import { router } from './router'

const start = async (): Promise<void> => {
  try {
    dotenv.config()
    const app = new Koa()
    const io = new IO({
      ioOptions: {
        cors: {},
      },
    })
    io.attach(app)
    app.use(cors())
    app.use(async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*')
      ctx.set('Access-Control-Allow-Credentials', 'true')
      ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
      await next()
    })

    io.use(async (_: Context, next: any) => {
      let start = dayjs()
      await next()
      console.log(`response time: ${-start.diff(dayjs(), 'millisecond')}ms`)
    })

    app.use(logger())
    app.use(error())
    app.use(cors())
    app.use(bodyParser({ enableTypes: ['json'] }))

    app.use(router.routes())
    app.use(router.allowedMethods())

    app.listen(process.env.PORT, () => {
      console.info(`Server running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
start()
/* eslint-enable @typescript-eslint/no-floating-promises */
