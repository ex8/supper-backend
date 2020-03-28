import { DefaultState, Context } from 'koa';
import Router from '@koa/router'
import { chef } from '../../../controllers'
import { isObjectId } from '../../../helpers/routes';

const router = new Router<DefaultState, Context>({ prefix: '/chefs' })

const { fetchChefs, fetchChefById, createChef, updateChefById, deleteChefById } = chef

router
  .get('/', fetchChefs)
  .get('/:id', isObjectId, fetchChefById)
  .post('/', createChef)
  .put('/:id', isObjectId, updateChefById)
  .delete('/:id', isObjectId, deleteChefById)

export default router
