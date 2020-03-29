import { DefaultState, Context } from 'koa';
import Router from '@koa/router'
import { chef } from '../../../controllers'
import { isObjectId } from '../../../helpers/routes';
import { isAuthenticated } from '../../../middlewares/passport';

const router = new Router<DefaultState, Context>({ prefix: '/chefs' })

const { fetchChefs, fetchChefById, createChef, updateChefById } = chef

router
  .get('/', isAuthenticated('admin'), fetchChefs)
  .get('/:id', isAuthenticated('chef', 'admin'), isObjectId, fetchChefById)
  .post('/', createChef)
  .put('/:id', isAuthenticated('chef', 'admin'), isObjectId, updateChefById)

export default router
