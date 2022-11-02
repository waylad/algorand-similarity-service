import * as Router from '@koa/router'

import { findSimilar } from './resolvers/findSimilar'

const router = new Router()

router
.get('/', async (ctx) => {
  ctx.body = 'You are not supposed to be here ;)'
})
.post('/find-similar', findSimilar)

export { router }
