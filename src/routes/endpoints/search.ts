import Router from 'koa-router'
import { Context } from 'koa'

const router = new Router({ prefix: '/search' })

router
  .get('/', (ctx: Context) => ctx.body = 'search list')

export default router
