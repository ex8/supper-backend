import { DefaultState, Context } from 'koa'
import Router from '@koa/router'
import { isAuthenticated } from '../../../middlewares/passport'
import { isObjectId } from '../../../helpers/routes'
import { plate } from '../../../controllers'

const router = new Router<DefaultState, Context>({ prefix: '/plates' })

const { fetchPlates, fetchPlateById, fetchPlateBySlug, createPlate, updatePlateById, deletePlateById } = plate

router
  .get('/', isAuthenticated('chef'), fetchPlates)
  .get('/:id', isAuthenticated('chef'), isObjectId, fetchPlateById)
  .get('/:slug', isAuthenticated('chef'), isObjectId, fetchPlateBySlug)
  .post('/', isAuthenticated('chef'), createPlate)
  .put('/:id', isAuthenticated('chef'), isObjectId, updatePlateById)
  .delete('/:id', isAuthenticated('chef'), isObjectId, deletePlateById)

export default router
