import { DefaultState, Context } from 'koa';
import Router from '@koa/router'
import { admin } from '../../../controllers'

const router = new Router<DefaultState, Context>({ prefix: '/admins' })

const { createAdmin } = admin

router
  .post('/', createAdmin)

export default router
