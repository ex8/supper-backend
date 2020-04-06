import { DefaultState, Context } from 'koa'
import Router from '@koa/router'
import { isAuthenticated } from '../../../middlewares/passport'
import { chef } from '../../../controllers'

const router = new Router<DefaultState, Context>({ prefix: '/chefs' })

const { createChef, updateChef } = chef

router
  .post('/', createChef)
  .put('/', isAuthenticated('chef'), updateChef)

export default router
