import Router from 'koa-router'
import { Middleware } from 'koa'
import compose from 'koa-compose'

import { userRouter, chefRouter, searchRouter } from './endpoints'

const routerDefinitions: Router[] = [
  userRouter,
  chefRouter,
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
