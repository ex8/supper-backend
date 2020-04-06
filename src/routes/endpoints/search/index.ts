import { DefaultState, Context } from 'koa'
import Router from '@koa/router'
import { plate } from '../../../controllers'

const router = new Router<DefaultState, Context>({ prefix: '/search' })

const { fetchAllPublicPlates, fetchPublicPlateBySlug } = plate

router
  .get('/', fetchAllPublicPlates)
  .get('/:slug', fetchPublicPlateBySlug)

export default router
