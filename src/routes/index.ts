import Router from 'koa-router'
import { Middleware } from 'koa'
import compose from 'koa-compose'

import { userRouter, searchRouter } from './endpoints'

const routerDefinitions: Router[] = [
  userRouter,
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
