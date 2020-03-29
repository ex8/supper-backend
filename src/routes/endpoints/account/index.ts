import { DefaultState, Context } from 'koa';
import Router from '@koa/router'
import { user } from '../../../controllers'

const router = new Router<DefaultState, Context>({ prefix: '/account' })

const { loginUser } = user

router
  .post('/login', loginUser)

export default router
