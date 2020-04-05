import Router from '@koa/router'
import { Middleware } from 'koa'
import compose from 'koa-compose'

import {
  searchRouter,
  authRouter,
  userRouter,
  chefRouter,
  adminRouter,
  plateRouter,
  accountRouter,
  chefAccountRouter,
} from './endpoints'

const routerDefinitions: Router[] = [
  searchRouter,
  authRouter,
  userRouter,
  chefRouter,
  adminRouter,
  plateRouter,
  accountRouter,
  chefAccountRouter,
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
