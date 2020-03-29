import Router from '@koa/router'
import { Middleware } from 'koa'
import compose from 'koa-compose'

import {
  userRouter,
  chefRouter,
  adminRouter,
  searchRouter,
  accountRouter,
} from './endpoints'

const routerDefinitions: Router[] = [
  userRouter,
  chefRouter,
  adminRouter,
  searchRouter,
  accountRouter,
]

export default function routes(): Middleware {
  const api = new Router({ prefix: '/api' })

  for (const router of routerDefinitions) {
    api.use(router.routes())
    api.use(router.allowedMethods())
  }

  return compose([
    api.routes(),
    api.allowedMethods(),
  ])
}
