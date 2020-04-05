import { DefaultState, Context } from 'koa';
import Router from '@koa/router'
import { chef } from '../../../controllers'

const router = new Router<DefaultState, Context>({ prefix: '/chef-account' })

const { loginChef } = chef

router
  .post('/login', loginChef)

export default router
