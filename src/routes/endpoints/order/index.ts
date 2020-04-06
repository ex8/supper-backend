import { DefaultState, Context } from 'koa'
import Router from '@koa/router'
import { isAuthenticated } from '../../../middlewares/passport'
import { order } from '../../../controllers'

const router = new Router<DefaultState, Context>({ prefix: '/orders' })

const { createOrder } = order

router
  .post('/', isAuthenticated('user'), createOrder)

export default router
