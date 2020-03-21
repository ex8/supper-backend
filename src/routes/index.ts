import Router from 'koa-router'
import { Middleware } from 'koa'
import compose from 'koa-compose'

import searchRouter from './endpoints/search'

const routerDefinitions: Router[] = [
  searchRouter,
]

export default function routes(): Middleware {
  const apiRouter = new Router({ prefix: '/api' })

  for (const router of routerDefinitions) {
    apiRouter.use(router.routes())
    apiRouter.use(router.allowedMethods())
  }
  
  return compose([
    apiRouter.routes(),
    apiRouter.allowedMethods(),
  ])
}
