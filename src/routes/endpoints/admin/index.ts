import { DefaultState, Context } from 'koa'
import Router from '@koa/router'
import { admin } from '../../../controllers'
import { isAuthenticated } from '../../../middlewares/passport'

const router = new Router<DefaultState, Context>({ prefix: '/admins' })

const { createAdmin, updateAdmin } = admin

router
  .post('/', isAuthenticated('admin'), createAdmin)
  .put('/', isAuthenticated('admin'), updateAdmin)

export default router
