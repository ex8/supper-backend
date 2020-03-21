import Router from 'koa-router'

import { user } from '../../controllers'

const router = new Router({ prefix: '/users' })

router  
  .get('/', user.fetchUsers)

export default router
