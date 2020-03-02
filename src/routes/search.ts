import { Context } from 'koa'
import Router from 'koa-router'

const router = new Router()

export default () => {
  router
    .get('/search/:slug', async (ctx: Context) => {
      ctx.body = 'searching...'
    })
}
