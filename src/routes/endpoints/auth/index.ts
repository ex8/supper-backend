import { DefaultState, Context } from 'koa'
import Router from '@koa/router'
import { isAuthenticated } from '../../../middlewares/passport'
import { auth } from '../../../controllers'
import koaPassport from 'koa-passport'

const router = new Router<DefaultState, Context>({ prefix: '/auth' })

const { me } = auth

router
  .get('/me', isAuthenticated('user', 'chef', 'admin'), me)
  // .get('/me', koaPassport.authenticate(['user', 'chef', 'admin'], { session: false }), me)

export default router
