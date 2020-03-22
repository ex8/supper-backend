import Router from 'koa-router'

import { plate } from '../../controllers'

const router = new Router({ prefix: '/search' })

router
  .get('/', plate.fetchAllPublicPlates)
  .get('/:slug', plate.fetchPublicPlateBySlug)

export default router
