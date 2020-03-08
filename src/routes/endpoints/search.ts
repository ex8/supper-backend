import { Context } from 'koa'
import Router from 'koa-router'

const router = new Router({ prefix: '/search' })

router
  .get('/', (ctx: Context) => ctx.body = 'search list')

export default router
