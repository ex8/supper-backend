import { DefaultState, Context } from 'koa'
import Router from '@koa/router'
import { isAuthenticated } from '../../../middlewares/passport'
import { auth } from '../../../controllers'

const router = new Router<DefaultState, Context>({ prefix: '/auth' })

const { me } = auth

router
  .get('/me', isAuthenticated('user', 'chef', 'admin'), me)

export default router
