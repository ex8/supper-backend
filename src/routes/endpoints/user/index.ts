import { DefaultState, Context } from 'koa'
import Router from '@koa/router'
import { isAuthenticated } from '../../../middlewares/passport'
import { user } from '../../../controllers'

const router = new Router<DefaultState, Context>({ prefix: '/users' })

const { createUser, updateUser } = user

router
  .post('/', createUser)
  .put('/', isAuthenticated('user'), updateUser)

export default router
